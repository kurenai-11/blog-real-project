import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAppSelector, useAuthKey } from "../../app/hooks";
import { useDeleteBlogMutation } from "../api/apiSlice";
import ModalButton from "../shared/ModalButton.component";
import ModalLink from "../shared/ModalLink.component";
import {
  closeButtonClasses,
  modalClasses,
  modalOverlayClasses,
  modalTitleClasses,
  useModalTransition,
} from "../shared/utils";
import { animated } from "@react-spring/web";

type DeleteModalProps = {
  currentBlogId: number;
  opened: boolean;
  setOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteBlogModal = ({
  currentBlogId,
  opened,
  setOpenedModal,
}: DeleteModalProps) => {
  const authKey = useAuthKey();
  const userId = useAppSelector((state) => state.user._id);
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isSuccess = await deleteBlog({
      authKey,
      userId,
      blogId: currentBlogId,
    }).unwrap();
    if (isSuccess) {
      window.location.hash = "";
    } else {
      // this shouldn't happen...
      console.log("error deleting a blog");
    }
  };
  const transition = useModalTransition(opened);
  return transition((style, opened) =>
    opened ? (
      <>
        <animated.div
          style={{ opacity: style.opacity }}
          id="deleteBlog"
          className={modalOverlayClasses}
        />
        <animated.div style={style} className={modalClasses}>
          <button
            onClick={() => setOpenedModal(false)}
            className={closeButtonClasses}
          >
            <AiOutlineClose />
          </button>
          <div className={twMerge(modalTitleClasses, "pr-6")}>
            Are you sure you want to delete this blog entirely?
          </div>
          <form onSubmit={submitHandler} className="flex pb-4 gap-2">
            <ModalButton
              onClick={() => setOpenedModal(false)}
              additionalClasses="bg-red-8"
            >
              Delete
            </ModalButton>
            <ModalButton
              onClick={() => setOpenedModal(false)}
              type="button"
              additionalClasses="bg-blue-8"
            >
              Cancel
            </ModalButton>
          </form>
        </animated.div>
      </>
    ) : null
  );
};

export default DeleteBlogModal;
