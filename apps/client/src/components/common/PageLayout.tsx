import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "5xl" | "6xl" | "7xl" | "full";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "7xl",
  className,
  ...props
}) => {
  const sizeClasses = {
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    "full": "max-w-full",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={cn("py-8 md:py-12 first:pt-4 last:pb-4", className)}
      {...props}
    >
      {children}
    </section>
  );
};

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  className,
  ...props
}) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-6", colClasses[cols], className)}
      {...props}
    >
      {children}
    </div>
  );
};
