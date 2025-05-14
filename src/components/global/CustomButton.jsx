"use client";
import Link from "next/link";
import { button as ShadcnButton } from "@/components/ui/button";

const CustomButton = ({
  link,
  text,
  onClick,
  variant,
  size,
  className,
  ...props
}) => {
  if (link) {
    return (
      <Link href={link} className={className}>
        <ShadcnButton variant={variant} size={size} {...props}>
          {text}
        </ShadcnButton>
      </Link>
    );
  } else {
    return (
      <ShadcnButton
        variant={variant}
        size={size}
        className={className}
        onClick={onClick}
        {...props}
      >
        {text}
      </ShadcnButton>
    );
  }
};

export default CustomButton;
