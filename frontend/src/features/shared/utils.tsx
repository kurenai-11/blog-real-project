import clsx, { ClassValue } from "clsx";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

// clsx - to merge classes
// twMerge - to remove conflicting classes that were merged
export const withClasses = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};

//
// Styled tailwind component implementation
//

// default props that react elements can receive
type ReactButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type ReactInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// Props our styled tailwind component will additionally have
// on top of the above defaults
type TailwindProps = {
  baseClasses: string;
  additionalClasses?: string;
};

// props needed to create a tailwind styled component
export type CreateButtonProps = TailwindProps & {
  reactProps: ReactButtonProps;
  children: React.ReactNode;
};
export type CreateInputProps = TailwindProps & {
  reactProps: ReactInputProps;
};

// props our implemented styled components will use
export type ImplementedButtonProps = ReactButtonProps & {
  additionalClasses?: string;
};
export type ImplementedInputProps = ReactInputProps & {
  additionalClasses?: string;
};

// factory functions to create a styled tailwind component
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
export const createTailwindInputComponent = ({
  reactProps,
  baseClasses,
  additionalClasses,
}: CreateInputProps) => {
  return (
    <input
      {...reactProps}
      className={withClasses(baseClasses, additionalClasses)}
    />
  );
};
