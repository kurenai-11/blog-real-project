import clsx, { ClassValue } from "clsx";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

// clsx - to merge classes
// twMerge - to remove conflicting classes that were merged
export const withClasses = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};

// default props that react elements can receive
type ReactButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

// props needed to create a tailwind styled element
export type CreateButtonProps = {
  reactProps: ReactButtonProps;
  children: React.ReactNode;
  baseClasses: string;
  additionalClasses?: string;
};

// props our styled elements will use
export type ImplementButtonProps = ReactButtonProps & {
  additionalClasses?: string;
};

// factory functions to create a styled tailwind element
export const createTailwindButtonComponent = ({
  children,
  reactProps,
  baseClasses,
  additionalClasses,
}: CreateButtonProps) => {
  return (
    <button
      {...reactProps}
      className={withClasses(baseClasses, additionalClasses)}
    >
      {children}
    </button>
  );
};
