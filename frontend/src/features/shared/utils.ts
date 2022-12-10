import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const withClasses = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};
