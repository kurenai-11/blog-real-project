import { withClasses } from "../shared/utils";

type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBlogModal = ({ setShowModal }: ModalProps) => {
  return (
    <>
      {/* overlay */}
      <div
        className={withClasses(
          "fixed z-1 top-0 left-0 w-full h-full bg-zinc-9 opacity-60"
        )}
      ></div>
      {/* modal itself */}
      <div
        className={withClasses(
          "w-[80vw] h-[70vh] bg-zinc-9 fixed z-2 left-10% top-20% flex flex-col items-center text-xl rounded-xl"
        )}
      >
        <button
          className="fixed top-20% right-10% w-12 h-12 text-xl flex justify-center items-center text-amber-3 outline-none border-none bg-red-5 rounded-xl"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <div className="bg-zinc-8 w-full h-12 py-3 text-center rounded-xl">
          Create a new blog
        </div>
      </div>
    </>
  );
};

export default AddBlogModal;
