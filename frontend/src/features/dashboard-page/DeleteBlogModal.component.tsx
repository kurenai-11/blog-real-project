import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAppSelector, useAuthKey } from "../../app/hooks";
import { useDeleteBlogMutation } from "../api/apiSlice";
import ModalButton from "./ModalButton.component";
import ModalLink from "./ModalLink.component";
import {
  closeButtonClasses,
  modalClasses,
  modalOverlayClasses,
  modalTitleClasses,
} from "./shared";

type DeleteModalProps = {
  currentBlog: number;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteBlogModal = ({ currentBlog, setIsChanged }: DeleteModalProps) => {
  const authKey = useAuthKey();
  const userId = useAppSelector((state) => state.user._id);
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isSuccess = await deleteBlog({
      authKey,
      userId,
      blogId: currentBlog,
    }).unwrap();
    if (isSuccess) {
      navigate(0);
    } else {
      // this shouldn't happen...
      console.log("error deleting a block");
    }
  };
  return (
    <div id="deleteBlog" className={modalOverlayClasses}>
      <div className={modalClasses}>
        <a href="#" className={closeButtonClasses}>
          <AiOutlineClose />
        </a>
        <div className={twMerge(modalTitleClasses, "pr-6")}>
          Are you sure you want to delete this blog entirely?
        </div>
        <form onSubmit={submitHandler} className="flex pb-4 gap-2">
          <ModalButton additionalClasses="bg-red-8">Delete</ModalButton>
          <ModalLink href="#" additionalClasses="bg-blue-8">
            Cancel
          </ModalLink>
        </form>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
