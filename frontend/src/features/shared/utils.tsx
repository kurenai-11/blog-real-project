import React from "react";
import { twMerge } from "tailwind-merge";

//
// Styled tailwind component implementation
//

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
    children?: React.ReactNode;
    additionalClasses?: string;
  };
