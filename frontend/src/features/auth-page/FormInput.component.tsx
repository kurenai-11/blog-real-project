import React from "react";
import { withClasses } from "../shared/utils";

type FormInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { additionalClasses?: string };

const FormInput = ({
  type = "text",
  placeholder,
  value,
  name,
  id,
  additionalClasses = "",
  onChange,
}: FormInputProps) => {
  const classes =
    "w-full text-center my-2 outline-none border-none py-2 rounded-2 text-lg bg-slate-5 text-zinc-2 placeholder:text-zinc-4 placeholder-text-center transition-all duration-300";
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      id={id}
      className={withClasses(classes, additionalClasses)}
      onChange={onChange}
    />
  );
};

export default FormInput;
