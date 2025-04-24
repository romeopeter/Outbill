import React from "react";

export type ButtonShape = {
  text?: string;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  props?: any;
};

/**
 *
 * @param text string
 * @param variant "solid" | "outline"
 * @param className string
 * @param children ReactNode
 *
 * @returns ReactElement
 */
export default function Button({
  text,
  variant,
  children,
  className,
  type = "button",
  onClick,
  ...props
}: ButtonShape) {
  const buttonVariant =
    variant === "solid"
      ? "bg-[var(--brand-green)] text-white"
      : "bg-white border border-[var(--brand-green)] text-[var(--brand-green)]";

  return (
    <button
      type={type}
      className={`h-12 p-4 ${buttonVariant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {text ? <span>{text}</span> : children}
    </button>
  );
}
