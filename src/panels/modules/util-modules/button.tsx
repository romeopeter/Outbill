import React from "react";
import { CN } from "../../../utils/classname-merge";

/* ---------------------------------------------------------------- */

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
  variant = "solid",
  children,
  className,
  type = "button",
  onClick,
  ...props
}: ButtonShape) {
  const buttonVariant =
    variant === "solid"
      ? "bg-[var(--brand-blue)] text-white"
      : "bg-transparent border border-[var(--brand-blue)] text-[var(--brand-blue)]";

  return (
    <button
      type={type}
      className={`h-12 p-4 ${CN(buttonVariant, className)} cursor-pointer`}
      onClick={onClick}
      {...props}
    >
      {text ? <span>{text}</span> : children}
    </button>
  );
}
