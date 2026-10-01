# Intern Dashboard

## Goal
Create a secure intern area where each person can apply for a track, see their AI recommendation, follow assigned milestones, and unlock their certificate only after completion.

## Experience
- Replace the placeholder sign-up with email/password and Google account access.
- Add a protected `/dashboard` with a clear sidebar and mobile navigation.
- Show application status, recommended track, next action, overall progress, and recent milestones.
- Add an application form for skills, career goals, education, availability, and preferred track.
- Use the existing AI Career Advisor to generate and save the recommended track and next steps.
- Show a milestone checklist and progress percentage; only completed milestones count.
- Keep certificate download locked until all required milestones are complete, then enable a personalized PDF.
- Update home-page calls to action and account navigation to enter the dashboard.

## Data and Security
- Store profiles, applications, recommendations, and milestones in Lovable Cloud.
- Keep every intern's records private with signed-in-user access rules.
- Allow interns to create and update their own application while protecting completion fields from browser-side manipulation.
- Seed the standard internship tracks and milestone templates used by the dashboard.

## Technical Details
- Use the existing TanStack route structure with a protected authenticated layout.
- Use server-side authenticated functions for private data and AI recommendation persistence.
- Preserve the current NxDigita navy, electric-blue, Manrope, and DM Sans brand system.
- Keep the AI model and streaming gateway flow already used by the Career Advisor.
- Add route-specific page titles and descriptions for the dashboard and account pages.

## Verification
- Test sign-up, sign-in, sign-out, application submission, recommendation display, progress updates, and certificate locked/unlocked states.
- Verify desktop and mobile layouts, private-data isolation, the AI response, and a clean preview build.
