import { twMerge } from "tailwind-merge";
import {
  createTailwindAComponent,
  createTailwindButtonComponent,
  ImplementedAProps,
  ImplementedButtonProps,
} from "../shared/utils";

const ModalButton = ({
  children,
  additionalClasses,
  buttonType = "button",
  ...reactProps
}: { buttonType?: "link" | "button" } & ImplementedAProps &
  ImplementedButtonProps) => {
  const baseClasses =
    "border-none decoration-none outline-none bg-zinc-8 py-2 px-3 text-xl text-zinc-2 rounded-xl cursor-pointer";
  if (buttonType === "link") {
    return createTailwindAComponent({
      children,
      reactProps,
      baseClasses,
      additionalClasses,
    });
  }
  return createTailwindButtonComponent({
    children,
    reactProps,
    baseClasses,
    additionalClasses,
  });
};

export default ModalButton;
