import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

/**
 * Type representing all Lucide icons excluding utility functions
 */
type LucideIconsType = Omit<
  typeof LucideIcons,
  "createLucideIcon" | "defaultAttributes" | "toKebabCase"
>;

/**
 * Valid icon names from the Lucide icon library
 */
type IconName = keyof LucideIconsType;

interface IconProps extends Omit<LucideProps, "ref"> {
  /**
   * Name of the icon from Lucide icon library
   */
  name: IconName;

  /**
   * Size of the icon
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl";

  /**
   * Color variant of the icon
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "muted" | "error" | "success";

  /**
   * Additional CSS classes to apply to the icon
   * @default ""
   */
  className?: string;
}

/**
 * Icon component that renders Lucide icons with configurable size and color variants
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  variant = "primary",
  className = "",
  ...props
}) => {
  if (!(name in LucideIcons)) {
    console.error(`Icon ${name} not found in Lucide icons`);
    return null;
  }

  /**
   * Mapping of size variants to CSS classes
   */
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  /**
   * Mapping of color variants to CSS classes
   */
  const variantMap = {
    primary: "text-primary",
    secondary: "text-secondary",
    muted: "text-muted-foreground",
    error: "text-destructive",
    success: "text-green-600",
  };

  const classes = `${sizeMap[size]} ${variantMap[variant]} ${className}`;

  const IconComponent = LucideIcons[name] as React.ComponentType<LucideProps>;

  return <IconComponent className={classes} {...props} />;
};
