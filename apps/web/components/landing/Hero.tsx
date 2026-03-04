"use client";

import { Button, Container } from "@repo/ui";
// Remove unused signIn import if no longer needed, or keep for other uses. 
// For now, replacing with Link.
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-glow" />
      
      <Container>
        <div className="badge">
          <span>✨</span>
          Next-Gen Tweet Enhancement
        </div>
        
        <h1 className="hero-title">
          Turn Thoughts into <br />
          <span className="text-gradient">Viral Tweets with AI</span>
        </h1>
        
        <p className="hero-desc">
          Stop struggling with engagement. Twitzie analyzes your drafts and rewrites 
          them for maximum impact, clarity, and viral reach instantly.
        </p>
        
        <div className="hero-actions">
          <Link href="/auth">
            <Button>
              Start Enhancing Free
            </Button>
          </Link>
          <Button variant="secondary">
            View Examples
          </Button>
        </div>
      </Container>
    </section>
  );
};
