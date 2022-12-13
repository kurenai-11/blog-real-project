import React from "react";
import { withClasses } from "../shared/utils";

type FormInputProps = {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  additionalClasses?: string;
};

const FormInput = ({
  type = "text",
  placeholder,
  value,
  name,
  id,
  additionalClasses,
}: FormInputProps) => {
  const classes =
    "my-2 outline-none border-none p-2 rounded-2 text-center text-lg bg-slate-5 text-zinc-2 placeholder:text-zinc-4 placeholder-text-center";
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      id={id}
      className={withClasses(classes, additionalClasses)}
    />
  );
};

export default FormInput;
