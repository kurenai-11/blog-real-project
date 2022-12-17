import { AiOutlineClose } from "react-icons/ai";
import { withClasses } from "../shared/utils";

const AddBlogModal = () => {
  return (
    <>
      <div
        id="addBlog"
        className={withClasses(
          // z--1 - below everything z-0 main content of the page
          // z-1 above main content of the page
          "fixed z--1 top-0 left-0 w-full h-full bg-zinc-9 bg-opacity-0 opacity-0 transition-all duration-300",
          "target:(opacity-100 bg-opacity-60 block z-1)"
        )}
      >
        <div
          className={withClasses(
            "w-[80vw] h-[70vh] bg-zinc-9 fixed z-2 left-10% top-20% items-center text-xl rounded-xl transition-all duration-1000 flex flex-col"
          )}
        >
          <a
            href="#"
            className="fixed top-20% right-10% w-12 h-12 text-4xl decoration-none flex justify-center items-center text-amber-3 outline-none border-none bg-red-5 rounded-xl cursor-pointer"
          >
            <AiOutlineClose />
          </a>
          <div className="bg-zinc-8 w-full h-12 py-3 text-center rounded-xl">
            Create a new blog
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlogModal;
