import { SignInButton } from "../../components/auth/SignInButton";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="auth-container">
      {/* Background Ambience */}
      <div className="auth-background">
          <div className="orb orb-purple" />
          <div className="orb orb-blue" />
          <div className="noise-overlay" />
      </div>

      <div className="auth-content">
        <div className="auth-card glass">
            {/* Subtle Gradient Border Effect */}
            <div className="card-gradient-border" />

            <div className="auth-header">
                <Link href="/" className="logo-link">
                    <span className="logo-text text-gradient animate-gradient">
                        twitzie.
                    </span>
                </Link>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">
                    Sign in to continue crafting viral tweets
                </p>
            </div>

            <div className="auth-buttons">
                <SignInButton 
                    provider="google" 
                    className="btn btn-primary w-full"
                >
                    Google
                </SignInButton>
                
                <SignInButton 
                    provider="github" 
                    className="btn btn-secondary w-full"
                >
                    GitHub
                </SignInButton>
            </div>

            <div className="auth-footer">
                <p>
                    By signing in, you agree to our{" "}
                    <Link href="/terms" className="link">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="link">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
