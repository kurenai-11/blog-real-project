import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useAppSelector, useAuthKey } from "../../app/hooks";
import { useDeletePostMutation } from "../api/apiSlice";
import ModalButton from "../shared/ModalButton.component";
import ModalLink from "../shared/ModalLink.component";
import {
  closeButtonClasses,
  modalClasses,
  modalOverlayClasses,
  modalTitleClasses,
} from "../shared/utils";

const DeletePostModal = ({ currentPost }: { currentPost: number }) => {
  const userId = useAppSelector((state) => state.user._id);
  const authKey = useAuthKey();
  const [deletePost] = useDeletePostMutation();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = await deletePost({
      authKey,
      userId,
      postId: currentPost,
    }).unwrap();
    if (result.status === "success") {
      window.location.hash = "";
    } else {
      // this shouldn't happen
      console.log("delete post ", result.status);
      window.location.hash = "";
    }
  };
  return (
    <div id="deletePost" className={modalOverlayClasses}>
      <div className={modalClasses}>
        <a href="#" className={closeButtonClasses}>
          <AiOutlineClose />
        </a>
        <div className={twMerge(modalTitleClasses, "pr-6")}>
          Are you sure you want to delete this post?
        </div>
        <form onSubmit={submitHandler} className="flex pb-4 gap-2">
          <ModalButton additionalClasses="bg-red-8 font-bold">
            Delete
          </ModalButton>
          <ModalLink href="#" additionalClasses="bg-blue-8">
            Cancel
          </ModalLink>
        </form>
      </div>
    </div>
  );
};

export default DeletePostModal;
