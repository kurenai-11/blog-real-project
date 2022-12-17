import {
  createTailwindComponent,
  ImplementedElementProps,
} from "../shared/utils";

const ModalTextArea = ({
  additionalClasses,
  children,
  ...reactProps
}: ImplementedElementProps<"textarea">) => {
  const baseClasses =
    "bg-zinc-8 outline-none border-none text-zinc-2 px-3 py-2 text-lg my-2 rounded-xl w-full resize-none overflow-hidden h-36";
  return createTailwindComponent({
    elementType: "textarea",
    baseClasses,
    additionalClasses,
    children,
    reactProps,
  });
};

export default ModalTextArea;
