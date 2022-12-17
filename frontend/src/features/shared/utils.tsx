import React from "react";
import { twMerge } from "tailwind-merge";

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
    <button {...reactProps} className={twMerge(baseClasses, additionalClasses)}>
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
      className={twMerge(baseClasses, additionalClasses)}
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
      className={twMerge(baseClasses, additionalClasses)}
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
    <a {...reactProps} className={twMerge(baseClasses, additionalClasses)}>
      {children}
    </a>
  );
};

// experimental

type CreateProps<T extends keyof JSX.IntrinsicElements> = {
  elementType: T;
  reactProps: JSX.IntrinsicElements[T];
  baseClasses: string;
  additionalClasses?: string;
  children?: React.ReactNode;
};

export const createTailwindComponent = <T extends keyof JSX.IntrinsicElements>({
  elementType,
  reactProps,
  baseClasses,
  additionalClasses,
  children,
}: CreateProps<T>) => {
  const Element = React.createElement(
    elementType,
    {
      ...reactProps,
      className: twMerge(baseClasses, additionalClasses),
    },
    children
  );
  return Element;
};

export type ImplementedElementProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T] & {
    children: React.ReactNode;
    additionalClasses?: string;
  };
// invocation

// export const ExperimentalComponent = (props) =>
// createTailwindComponent("a", props, "", "");
