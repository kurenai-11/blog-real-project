import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAuthKey } from "../../app/hooks";
import { useCreateBlogMutation, useEditBlogMutation } from "../api/apiSlice";
import ModalButton from "../shared/ModalButton.component";
import ModalInput from "../shared/ModalInput.component";
import ModalLink from "../shared/ModalLink.component";
import ModalTextArea from "../shared/ModalTextarea.component";
import {
  closeButtonClasses,
  modalClasses,
  modalOverlayClasses,
  modalTitleClasses,
} from "../shared/utils";

type ModalProps = {
  modalTitle: string;
  type: "addBlog" | "editBlog";
  currentBlog: number;
  refetch: () => QueryActionCreatorResult<any>;
};

// means Add OR Edit blog modal
const AddEditBlogModal = ({
  modalTitle,
  type,
  currentBlog,
  refetch,
}: ModalProps) => {
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
        // refetches our blog list in the dashboard, if the user decides
        // to return there at a later point
        refetch();
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
        refetch();
        window.location.hash = "";
      } else {
        // this shouldn't happen...
        console.log("something went wrong...");
      }
    }
  };
  return (
    <div id={type} className={modalOverlayClasses}>
      <div className={modalClasses}>
        <a href="#" className={closeButtonClasses}>
          <AiOutlineClose />
        </a>
        <div className={modalTitleClasses}>{modalTitle}</div>
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
