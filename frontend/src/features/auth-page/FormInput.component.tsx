import { element, ImplementedElementProps } from "../shared/stc";

const FormInput = (props: ImplementedElementProps<"input">) => {
  return element`w-full text-center my-2 outline-none border-none py-2 rounded-2 text-lg bg-slate-5 text-zinc-2 placeholder:text-zinc-4 placeholder-text-center transition-all duration-300 ${{
    element: "input",
    ...props,
  }}`;
};

export default FormInput;
