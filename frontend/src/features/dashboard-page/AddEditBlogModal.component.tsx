import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAuthKey } from "../../app/hooks";
import { useCreateBlogMutation, useEditBlogMutation } from "../api/apiSlice";
import ModalButton from "./ModalButton.component";
import ModalInput from "./ModalInput.component";
import ModalLink from "./ModalLink.component";
import ModalTextArea from "./ModalTextarea.component";

type ModalProps = {
  modalTitle: string;
  type: "addBlog" | "editBlog";
  currentBlog: number;
};

const AddEditBlogModal = ({ modalTitle, type, currentBlog }: ModalProps) => {
  const authKey = useAuthKey();
  const userId = useAppSelector((state) => state.user._id);
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [editBlog, { isLoading: isEditing }] = useEditBlogMutation();
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let [title, description] = [
      formData.get("title")?.toString(),
      formData.get("description")?.toString(),
    ];
    if (!authKey || userId === undefined) {
      // just to be sure, don't submit
      // todo: validation and showing errors to the user
      // but not needed at the moment because user should not have
      // access to the modal if not authenticated
      console.log("there is no auth, why?");
      return;
    }
    if (!description) {
      description = "No description";
    }
    if (!title) {
      title = "No title";
    }
    if (type === "addBlog") {
      const response = await createBlog({
        title,
        description,
        authKey,
        userId,
      }).unwrap();
      if (response.status === "success") {
        navigate(`/blogs/${response.blogId}`);
      }
    } else {
      const response = await editBlog({
        title,
        description,
        authKey,
        userId,
        blogId: currentBlog,
      }).unwrap();
      if (response.status === "success") {
        navigate(0);
      } else {
        // this shouldn't happen...
        console.log("something went wrong...");
      }
    }
  };
  return (
    <div
      id={type}
      // z--1 - below everything z-0 main content of the page
      // z-1 above main content of the page
      className="fixed z--1 top-0 left-0 w-full h-full bg-zinc-9 bg-opacity-0 opacity-0 transition-all duration-300 target:(opacity-100 bg-opacity-60 block z-1)"
    >
      <div className="w-[80vw] bg-zinc-9 fixed z-2 left-10% top-20% items-center text-xl rounded-xl transition-all duration-1000 flex flex-col">
        <a
          href="#"
          className="absolute left-[calc(100%-3rem)] w-12 h-12 text-4xl decoration-none flex justify-center items-center text-amber-3 outline-none border-none bg-red-5 rounded-xl cursor-pointer"
        >
          <AiOutlineClose />
        </a>
        <div className="bg-zinc-8 w-full h-12 py-3 text-center rounded-xl mb-4">
          {modalTitle}
        </div>
        <form className="w-full" onSubmit={submitHandler}>
          <div className="px-3 flex flex-col gap-2 justify-center items-center">
            <span className="text-xl font-bold">Title</span>
            <ModalInput name="title" additionalClasses="text-center" />
          </div>
          <div className="px-3 flex flex-col gap-2 justify-center items-center">
            <span className="text-xl font-bold">Description</span>
            <ModalTextArea name="description" />
          </div>
          <div className="flex gap-2 pt-2 pb-4 px-3 justify-end">
            <ModalButton
              type="submit"
              additionalClasses={
                type === "addBlog" ? "bg-green-8" : "bg-blue-8"
              }
            >
              Confirm
            </ModalButton>
            <ModalLink href="#">Cancel</ModalLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlogModal;
