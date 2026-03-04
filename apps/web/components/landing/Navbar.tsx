"use client";

import { Button, Container } from "@repo/ui";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export const Navbar = () => {
  const { data: session } = useSession();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar glass">
      <Container className="navbar-content">
        {/* Logo */}
        <Link href="/" className="logo">
          twitzie<span>.</span>
        </Link>

        {/* Navigation */}
        <div className="nav-links">
          <button 
            onClick={() => scrollToSection("how-it-works")} 
            className="nav-link"
          >
            How it works
          </button>
          <button 
            onClick={() => scrollToSection("features")} 
            className="nav-link"
          >
            Features
          </button>
        </div>

        {/* Auth Actions */}
        <div className="nav-actions">
          {session ? (
            <Link href="/dashboard">
              <Button variant="primary">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="primary">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </Container>
    </nav>
  );
};
