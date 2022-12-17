import {
  createTailwindInputComponent,
  ImplementedInputProps,
} from "../shared/utils";

const FormInput = ({
  additionalClasses,
  ...reactProps
}: ImplementedInputProps) => {
  const baseClasses =
    "w-full text-center my-2 outline-none border-none py-2 rounded-2 text-lg bg-slate-5 text-zinc-2 placeholder:text-zinc-4 placeholder-text-center transition-all duration-300";
  return createTailwindInputComponent({
    reactProps,
    baseClasses,
    additionalClasses,
  });
};

export default FormInput;
