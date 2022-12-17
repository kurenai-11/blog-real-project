import React from "react";
import { withClasses } from "../shared/utils";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { additionalClasses?: string; inputType?: "input" | "textarea" };

const ModalInput = ({
  type = "text",
  name,
  additionalClasses = "",
  inputType = "input",
}: InputProps) => {
  const baseClasses =
    "bg-zinc-8 outline-none border-none text-zinc-2 px-3 py-2 text-lg my-2 rounded-xl w-full";
  if (inputType === "textarea") {
    return (
      <textarea
        name={name}
        className={withClasses(
          baseClasses,
          "resize-none overflow-hidden h-36",
          additionalClasses
        )}
      />
    );
  }
  return (
    <input
      name={name}
      className={withClasses(baseClasses, additionalClasses)}
      type={type}
    />
  );
};

export default ModalInput;
