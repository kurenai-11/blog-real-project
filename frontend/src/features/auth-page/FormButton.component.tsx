import { element, ImplementedElementProps } from "../shared/stc";

const FormButton = (props: ImplementedElementProps<"button">) => {
  return element`flex justify-center items-center gap-1 outline-none border-none py-2 px-4 my-2 rounded-2 bg-coolGray-6 text-zinc-2 text-lg cursor-pointer transition-all hover:( bg-coolgray-7 text-zinc-1 ) ${{
    element: "button",
    ...props,
  }}`;
};

export default FormButton;
