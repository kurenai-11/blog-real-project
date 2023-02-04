import { element, type ImplementedElementProps } from "./stc";

const ModalInput = (props: ImplementedElementProps<"input">) => {
  return element`bg-zinc-8 outline-none border-none text-zinc-2 px-3 py-2 text-lg my-2 rounded-xl w-full ${{
    element: "input",
    ...props,
  }}`;
};

export default ModalInput;
