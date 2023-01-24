import { element, type ImplementedElementProps } from "./stc";

const ModalLink = (props: ImplementedElementProps<"a">) => {
  return element`border-none decoration-none outline-none bg-zinc-8 py-2 px-3 text-xl text-zinc-2 rounded-xl cursor-pointer ${{
    element: "a",
    ...props,
  }}`;
};

export default ModalLink;
