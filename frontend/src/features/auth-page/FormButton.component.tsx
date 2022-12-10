import { PropsWithChildren } from "react";

const ButtonTypes = {
  submit: "submit",
  button: "button",
  reset: "reset",
} as const;

type FormButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // I tried to use React.ButtonHTMLAttributes<HTMLButtonElement>
  // but I couldn't find a way to make it work
  type: keyof typeof ButtonTypes;
};

const FormButton = ({
  children,
  onClick,
  type = "submit",
}: PropsWithChildren<FormButtonProps>) => {
  return (
    <button
      className="flex justify-center items-center gap-1 border-none py-2 px-4 my-2 bg-coolGray-6 text-zinc-2 text-lg cursor-pointer"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default FormButton;
