import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter } from "lucide-react";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Live Projects", href: "#live-projects" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Certificate", href: "#certificate" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Why Us", href: "#why-us" },
      { label: "Partners", href: "#partners" },
      { label: "Sign Up", href: "/signup" },
    ],
  },
  {
    heading: "Partners",
    links: [
      { label: "Hire Interns", href: "#partners" },
      { label: "Partner Network", href: "#partners" },
      { label: "Become a Partner", href: "/signup" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
  {
  label: "Terms and Conditions",
  href: "/terms-and-conditions",
},
{
  label: "Refund Policy",
  href: "/refund-policy",
},
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com" },
  { label: "X", icon: Twitter, href: "https://x.com" },
  { label: "GitHub", icon: Github, href: "https://github.com" },
];

export function Footer() {
  return (
    <footer className="dark-panel border-t border-dark-foreground/10">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
  <img
    src="/NXDIgita.jpeg"
    alt="NxDigita"
    className="size-10 shrink-0 rounded-md bg-white object-contain"
  />
  <div>
    <p className="font-heading text-sm font-bold text-dark-foreground">
      NxDigita AI Technologies
    </p>
    <p className="mt-1.5 text-[10px] font-medium tracking-[0.2em] text-dark-muted">
      HIRE · ENGAGE · DEPLOY
    </p>
  </div>
</div>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-dark-foreground/15 text-dark-muted transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
  <div key={column.heading}>
    <p className="text-xs font-semibold tracking-[0.15em] text-primary">
      {column.heading.toUpperCase()}
    </p>
    <ul className="mt-4 space-y-2.5">
      {column.links.map((link) => (
        <li key={link.label}>
          {link.href.startsWith("/") &&
          !/\.(pdf|docx?)$/i.test(link.href) ? (
            <Link
              to={link.href}
              className="text-sm text-dark-muted transition-colors hover:text-dark-foreground"
            >
              {link.label}
            </Link>
          ) : (
            <a
              href={link.href}
              target={link.newTab ? "_blank" : undefined}
              rel={link.newTab ? "noreferrer" : undefined}
              className="text-sm text-dark-muted transition-colors hover:text-dark-foreground"
            >
              {link.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
 ))}
        </div>

        <p className="mt-12 border-t border-dark-foreground/10 pt-6 text-xs text-dark-muted">
          © {new Date().getFullYear()} NxDigita AI Technologies. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}


