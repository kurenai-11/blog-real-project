import { createElement } from "react";
import { twMerge } from "tailwind-merge";

// styled tailwind component implementation

export type ElementProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T] & {
    element: T;
    additionalClasses?: string;
  };

export type ImplementedElementProps<T extends keyof JSX.IntrinsicElements> =
  Omit<ElementProps<T>, "element">;

export const element = <T extends keyof JSX.IntrinsicElements>(
  strings: TemplateStringsArray,
  elementProps: ElementProps<T>
) => {
  const baseClasses = strings[0];
  const element = elementProps.element;
  const props: Partial<ElementProps<T>> = { ...elementProps };
  const additionalClasses = props.additionalClasses;
  delete props.additionalClasses;
  delete props.element;
  return createElement(
    element,
    {
      ...props,
      className: twMerge(baseClasses, additionalClasses),
    },
    elementProps.children
  );
};
