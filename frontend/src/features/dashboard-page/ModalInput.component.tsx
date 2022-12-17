import clsx from "clsx";
import {
  createTailwindInputComponent,
  createTailwindTextareaComponent,
  ImplementedInputProps,
  ImplementedTextareaProps,
  withClasses,
} from "../shared/utils";

const ModalInput = ({
  additionalClasses,
  inputType = "input",
  ...reactProps
}: { inputType?: "input" | "textarea" } & ImplementedInputProps &
  ImplementedTextareaProps) => {
  const baseClasses =
    "bg-zinc-8 outline-none border-none text-zinc-2 px-3 py-2 text-lg my-2 rounded-xl w-full";
  const areaClasses = clsx(baseClasses, "resize-none overflow-hidden h-36");
  if (inputType === "textarea") {
    return createTailwindTextareaComponent({
      reactProps,
      baseClasses: areaClasses,
      additionalClasses,
    });
  }
  return createTailwindInputComponent({
    reactProps,
    baseClasses,
    additionalClasses,
  });
};

export default ModalInput;
