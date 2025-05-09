"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  
  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-primary">
            Vibe Coding Jam
          </Link>
          
          <div className="flex space-x-4">
            <NavLink href="/" active={pathname === "/"}>Home</NavLink>
            <NavLink href="/projects" active={pathname === "/projects"}>Projects</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

type NavLinkProps = {
  href: string;
  active: boolean;
  children: React.ReactNode;
};

const NavLink = ({ href, active, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? "text-primary bg-primary/10"
          : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
      }`}
    >
      {children}
    </Link>
  );
};
