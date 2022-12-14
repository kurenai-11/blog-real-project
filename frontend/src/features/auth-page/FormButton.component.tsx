import {
  createTailwindComponent,
  ImplementedElementProps,
} from "../shared/utils";

const FormButton = ({
  additionalClasses,
  children,
  ...reactProps
}: ImplementedElementProps<"button">) => {
  const baseClasses =
    "flex justify-center items-center gap-1 outline-none border-none py-2 px-4 my-2 rounded-2 bg-coolGray-6 text-zinc-2 text-lg cursor-pointer transition-all hover:( bg-coolgray-7 text-zinc-1 )";
  return createTailwindComponent({
    elementType: "button",
    baseClasses,
    additionalClasses,
    children,
    reactProps,
  });
};

export default FormButton;
