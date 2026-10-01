import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ApplicationInput = z.object({
  fullName: z.string().trim().min(2).max(100),
  college: z.string().trim().min(2).max(160),
  education: z.string().trim().min(2).max(300),
  skills: z.string().trim().min(3).max(2000),
  careerGoals: z.string().trim().min(3).max(2000),
  availability: z.string().trim().min(2).max(100),
  preferredTrack: z.string().trim().min(2).max(100),
});

const MILESTONES = [
  ["Complete onboarding assessment", "Confirm your skills baseline and internship goals."],
  ["Join your project team", "Meet your mentor and review the live project brief."],
  ["Deliver project checkpoint", "Submit a reviewed contribution to the live project."],
  ["Complete final project review", "Pass the final quality and contribution review."],
  ["Placement readiness verified", "Complete your portfolio and hiring-readiness review."],
] as const;

export const getInternDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [profileResult, applicationResult, recommendationResult, milestonesResult] = await Promise.all([
      context.supabase.from("profiles").select("full_name, college").eq("id", context.userId).maybeSingle(),
      context.supabase.from("internship_applications").select("*").eq("user_id", context.userId).maybeSingle(),
      context.supabase.from("intern_recommendations").select("*").eq("user_id", context.userId).maybeSingle(),
      context.supabase.from("intern_milestones").select("*").eq("user_id", context.userId).order("position"),
    ]);
    const error = profileResult.error ?? applicationResult.error ?? recommendationResult.error ?? milestonesResult.error;
    if (error) throw new Error(error.message);
    return {
      profile: profileResult.data,
      application: applicationResult.data,
      recommendation: recommendationResult.data,
      milestones: milestonesResult.data ?? [],
    };
  });

export const submitInternApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => ApplicationInput.parse(input))
  .handler(async ({ data, context }) => {
    const profileResult = await context.supabase.from("profiles").upsert({
      id: context.userId,
      full_name: data.fullName,
      college: data.college,
      updated_at: new Date().toISOString(),
    });

    if (profileResult.error) {
      throw new Error(profileResult.error.message);
    }

    const applicationResult = await context.supabase
      .from("internship_applications")
      .upsert(
        {
          user_id: context.userId,
          education: data.education,
          skills: data.skills,
          career_goals: data.careerGoals,
          availability: data.availability,
          preferred_track: data.preferredTrack,
          status: "submitted",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      )
      .select("id")
      .single();

    if (applicationResult.error) {
      throw new Error(applicationResult.error.message);
    }

    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    // Create the internship milestones immediately.
    // The application should not depend on Gemini being available.
    const milestoneRows = MILESTONES.map(
      ([title, description], index) => ({
        user_id: context.userId,
        title,
        description,
        position: index + 1,
        completed: index === 0,
        completed_at:
          index === 0 ? new Date().toISOString() : null,
      }),
    );

    const milestonesResult = await supabaseAdmin
      .from("intern_milestones")
      .upsert(milestoneRows, {
        onConflict: "user_id,position",
      });

    if (milestonesResult.error) {
      throw new Error(milestonesResult.error.message);
    }

    // Generate the AI recommendation after the application
    // and milestones have been successfully saved.
    const apiKey = process.env["GEMINI_API_KEY"];

let recommendation = {
  recommendedTrack: data.preferredTrack,
  fitSummary: `Your selected ${data.preferredTrack} track is aligned with your stated career goals, skills, and application details.`,
  skillGaps: [] as string[],
  nextSteps: [] as string[],
};

if (apiKey) {
  try {
    const { createCareerRecommendation } = await import(
      "./career-recommendation.server"
    );

    recommendation = await createCareerRecommendation({
      apiKey,
      skills: data.skills,
      goals: data.careerGoals,
      education: data.education,
      availability: data.availability,
      preferredTrack: data.preferredTrack,
    });
  } catch (error) {
    console.error("AI recommendation failed. Using preferred track:", error);
  }
} else {
  console.error("GEMINI_API_KEY is not configured. Using preferred track.");
}

const recommendationResult = await supabaseAdmin
  .from("intern_recommendations")
  .upsert(
    {
      user_id: context.userId,
      application_id: applicationResult.data.id,
      recommended_track: data.preferredTrack,
      fit_summary: recommendation.fitSummary,
      skill_gaps: recommendation.skillGaps,
      next_steps: recommendation.nextSteps,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

if (recommendationResult.error) {
  throw new Error(recommendationResult.error.message);
}

    return { ok: true };
  });