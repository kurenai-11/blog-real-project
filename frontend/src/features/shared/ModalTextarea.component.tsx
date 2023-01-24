import { element, ImplementedElementProps } from "./stc";

const ModalTextArea = (props: ImplementedElementProps<"textarea">) => {
  return element`bg-zinc-8 outline-none border-none text-zinc-2 px-3 py-2 text-lg my-2 rounded-xl w-full resize-none overflow-hidden h-36 ${{
    element: "textarea",
    ...props,
  }}`;
};

export default ModalTextArea;
