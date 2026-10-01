CREATE TABLE public.internship_tracks (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  position INTEGER NOT NULL UNIQUE CHECK (position > 0),
  active BOOLEAN NOT NULL DEFAULT true
);
GRANT SELECT ON public.internship_tracks TO anon, authenticated;
GRANT ALL ON public.internship_tracks TO service_role;
ALTER TABLE public.internship_tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active tracks are public" ON public.internship_tracks FOR SELECT TO anon, authenticated USING (active = true);

CREATE TABLE public.milestone_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_slug TEXT NOT NULL REFERENCES public.internship_tracks(slug) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL CHECK (position > 0),
  active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE (track_slug, position)
);
GRANT SELECT ON public.milestone_templates TO anon, authenticated;
GRANT ALL ON public.milestone_templates TO service_role;
ALTER TABLE public.milestone_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active milestone templates are public" ON public.milestone_templates FOR SELECT TO anon, authenticated USING (active = true);
CREATE INDEX milestone_templates_track_position_idx ON public.milestone_templates(track_slug, position);