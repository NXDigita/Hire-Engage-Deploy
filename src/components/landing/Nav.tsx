import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const NAV_LINKS = [
  { label: "Product", href: "#live-projects" },
  { label: "Why Us", href: "#why-us" },
  { label: "Partners", href: "#partners" },
  { label: "Career Advisor", href: "#career-advisor" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-dark-foreground/10 bg-navy/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 leading-none">
         <img
  src="/NXDIgita.jpeg"
  alt="NxDigita"
  className="size-9 shrink-0 rounded-md bg-white object-contain"
/>
          <span className="flex flex-col">
          <span className="text-[15px] font-bold text-dark-foreground">
            NxDigita AI Technologies
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-[0.2em] text-dark-muted">
            HIRE · ENGAGE · DEPLOY
          </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-dark-muted transition-colors hover:text-dark-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {signedIn ? (
            <>
              <Link to="/dashboard" className="hidden text-sm text-dark-muted transition-colors hover:text-dark-foreground sm:block">Dashboard</Link>
              <Link to="/dashboard" className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">My Progress</Link>
            </>
          ) : (
            <>
              <Link to="/signup" search={{ mode: "login" }} className="hidden text-sm text-dark-muted transition-colors hover:text-dark-foreground sm:block">Login</Link>
              <Link to="/signup" search={{ mode: "signup" }} className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Sign Up Free</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
