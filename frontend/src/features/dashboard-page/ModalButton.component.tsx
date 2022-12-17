import { withClasses } from "../shared/utils";

type ModalButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  additionalClasses?: string;
  buttonType?: "button" | "link";
  toHref?: string;
};

const ModalButton = ({
  children,
  additionalClasses = "",
  buttonType = "button",
  toHref,
  type = "button",
  onClick,
}: ModalButtonProps) => {
  const baseClasses =
    "border-none outline-none bg-zinc-8 py-2 px-3 text-xl text-zinc-2 rounded-xl cursor-pointer";
  if (buttonType === "link") {
    return (
      <a
        className={withClasses(
          baseClasses,
          "decoration-none",
          additionalClasses
        )}
        href={toHref}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      className={withClasses(baseClasses, additionalClasses)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ModalButton;
