import clsx, { ClassValue } from "clsx";
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
type ReactButtonProps = JSX.IntrinsicElements["button"];
type ReactInputProps = JSX.IntrinsicElements["input"];
type ReactTextareaProps = JSX.IntrinsicElements["textarea"];
type ReactAProps = JSX.IntrinsicElements["a"];

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
export type CreateTextareaProps = TailwindProps & {
  reactProps: ReactTextareaProps;
};
export type CreateAProps = TailwindProps & {
  reactProps: ReactAProps;
  children: React.ReactNode;
};

// props our implemented styled components will use
export type ImplementedButtonProps = ReactButtonProps & {
  additionalClasses?: string;
};
export type ImplementedInputProps = ReactInputProps & {
  additionalClasses?: string;
};
export type ImplementedTextareaProps = ReactTextareaProps & {
  additionalClasses?: string;
};
export type ImplementedAProps = ReactAProps & {
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
export const createTailwindTextareaComponent = ({
  reactProps,
  baseClasses,
  additionalClasses,
}: CreateTextareaProps) => {
  return (
    <textarea
      {...reactProps}
      className={withClasses(baseClasses, additionalClasses)}
    />
  );
};
export const createTailwindAComponent = ({
  children,
  reactProps,
  baseClasses,
  additionalClasses,
}: CreateAProps) => {
  return (
    <a {...reactProps} className={withClasses(baseClasses, additionalClasses)}>
      {children}
    </a>
  );
};
