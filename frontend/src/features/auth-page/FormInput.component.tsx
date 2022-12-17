import {
  createTailwindComponent,
  ImplementedElementProps,
} from "../shared/utils";

const FormInput = ({
  additionalClasses,
  ...reactProps
}: ImplementedElementProps<"input">) => {
  const baseClasses =
    "w-full text-center my-2 outline-none border-none py-2 rounded-2 text-lg bg-slate-5 text-zinc-2 placeholder:text-zinc-4 placeholder-text-center transition-all duration-300";
  return createTailwindComponent({
    elementType: "input",
    baseClasses,
    additionalClasses,
    reactProps,
  });
};

export default FormInput;
