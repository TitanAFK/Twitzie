import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  href?: string;
}

export function Card({ title, children, className = "", href }: CardProps) {
  const Content = (
    <div className={`glass feature-card ${className}`}>
      {title && <h3 className="feature-title">{title}</h3>}
      <div className="feature-desc">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {Content}
      </a>
    );
  }

  return Content;
}
