import { createTailwindComponent, ImplementedElementProps } from "./utils";

const ModalInput = ({
  additionalClasses,
  children,
  ...reactProps
}: ImplementedElementProps<"input">) => {
  const baseClasses =
    "bg-zinc-8 outline-none border-none text-zinc-2 px-3 py-2 text-lg my-2 rounded-xl w-full";
  return createTailwindComponent({
    elementType: "input",
    baseClasses,
    additionalClasses,
    children,
    reactProps,
  });
};

export default ModalInput;
