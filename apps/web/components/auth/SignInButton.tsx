"use client";

import { signIn } from "next-auth/react";
import { Button } from "@repo/ui";
import { Github, Chrome } from "lucide-react"; // Assuming lucide-react is available, Chrome can substitute for Google icon or use generic
import { useState } from "react";

interface SignInButtonProps {
  provider: "google" | "github";
  children?: React.ReactNode;
  className?: string;
  redirectTo?: string;
}

export const SignInButton = ({ provider, children, className, redirectTo }: SignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: redirectTo || "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = provider === "github" ? Github : Chrome; // Simple fallback
  
  return (
    <Button 
      variant="secondary" 
      className={`sign-in-btn-internal ${className || ""}`}
      onClick={handleSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="animate-spin">⌛</span>
      ) : (
        <Icon className="w-5 h-5" />
      )}
      {children || `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </Button>
  );
};
