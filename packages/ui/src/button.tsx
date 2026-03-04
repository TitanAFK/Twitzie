"use client";

import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
  appName?: string; // Opt-in if needed, but keeping it flexible
}

export const Button = ({ 
  children, 
  className = "", 
  variant = "primary", 
  appName, 
  ...props 
}: ButtonProps) => {
  const variantClass = `btn-${variant}`;

  return (
    <button
      className={`btn ${variantClass} ${className}`}
      onClick={(e) => {
        if (appName) alert(`Hello from your ${appName} app!`);
        props.onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
