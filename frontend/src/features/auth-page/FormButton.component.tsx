type FormButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const FormButton = ({
  children,
  onClick,
  type = "submit",
}: FormButtonProps) => {
  return (
    <button
      className="flex justify-center items-center gap-1 border-none py-2 px-4 my-2 rounded-2 bg-coolGray-6 text-zinc-2 text-lg cursor-pointer transition-all hover:( bg-coolgray-5 text-zinc-1 )"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default FormButton;
