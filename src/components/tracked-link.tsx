"use client";

import { analytics } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  ctaType: "intelliagent" | "contact" | "github";
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function TrackedLink({
  href,
  ctaType,
  children,
  className,
  target,
  rel,
}: TrackedLinkProps) {
  const handleClick = () => {
    analytics.ctaClicked(ctaType);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
