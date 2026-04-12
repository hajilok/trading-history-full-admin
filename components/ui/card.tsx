import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardTone = "default" | "muted" | "accent";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: CardTone;
};

const toneClasses: Record<CardTone, string> = {
  default: "bg-surface-container-lowest shadow-ambient",
  muted: "bg-surface-container-low shadow-ambient",
  accent: "bg-primary-container text-white shadow-editorial",
};

export function Card({ children, className, tone = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] p-8 md:p-10 transition duration-300",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
