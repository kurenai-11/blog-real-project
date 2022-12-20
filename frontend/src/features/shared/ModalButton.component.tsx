import { createTailwindComponent, ImplementedElementProps } from "./utils";

const ModalButton = ({
  additionalClasses,
  children,
  ...reactProps
}: ImplementedElementProps<"button">) => {
  const baseClasses =
    "border-none decoration-none outline-none bg-zinc-8 py-2 px-3 text-xl text-zinc-2 rounded-xl cursor-pointer";
  return createTailwindComponent({
    elementType: "button",
    baseClasses,
    additionalClasses,
    children,
    reactProps,
  });
};

export default ModalButton;
