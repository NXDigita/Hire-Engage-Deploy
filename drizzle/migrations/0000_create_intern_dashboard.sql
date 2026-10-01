CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT '',
  college TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Interns can read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Interns can create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Interns can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.internship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  education TEXT NOT NULL,
  skills TEXT NOT NULL,
  career_goals TEXT NOT NULL,
  availability TEXT NOT NULL,
  preferred_track TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'accepted', 'completed')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);
GRANT SELECT, INSERT, UPDATE ON public.internship_applications TO authenticated;
GRANT ALL ON public.internship_applications TO service_role;
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Interns can read own application" ON public.internship_applications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Interns can submit own application" ON public.internship_applications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'submitted');
CREATE POLICY "Interns can update own submitted application" ON public.internship_applications FOR UPDATE TO authenticated USING (auth.uid() = user_id AND status = 'submitted') WITH CHECK (auth.uid() = user_id AND status = 'submitted');

CREATE TABLE public.intern_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  application_id UUID NOT NULL REFERENCES public.internship_applications(id) ON DELETE CASCADE,
  recommended_track TEXT NOT NULL,
  fit_summary TEXT NOT NULL,
  skill_gaps JSONB NOT NULL DEFAULT '[]'::jsonb,
  next_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.intern_recommendations TO authenticated;
GRANT ALL ON public.intern_recommendations TO service_role;
ALTER TABLE public.intern_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Interns can read own recommendation" ON public.intern_recommendations FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.intern_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL CHECK (position > 0),
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, position)
);
GRANT SELECT ON public.intern_milestones TO authenticated;
GRANT ALL ON public.intern_milestones TO service_role;
ALTER TABLE public.intern_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Interns can read own milestones" ON public.intern_milestones FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE INDEX internship_applications_user_id_idx ON public.internship_applications(user_id);
CREATE INDEX intern_recommendations_user_id_idx ON public.intern_recommendations(user_id);
CREATE INDEX intern_milestones_user_id_position_idx ON public.intern_milestones(user_id, position);
