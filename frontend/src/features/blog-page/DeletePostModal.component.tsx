import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useAppSelector, useAuthKey } from "../../app/hooks";
import { useDeletePostMutation } from "../api/apiSlice";
import ModalButton from "../shared/ModalButton.component";
import {
  closeButtonClasses,
  modalClasses,
  modalOverlayClasses,
  modalTitleClasses,
  useModalTransition,
} from "../shared/utils";
import { animated } from "@react-spring/web";

const DeletePostModal = ({
  currentPost,
  opened,
  setOpened,
}: {
  currentPost: number;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
  const transition = useModalTransition(opened);
  return transition(
    (style, opened) =>
      opened && (
        <>
          <animated.div
            style={{ opacity: style.opacity }}
            id="deletePost"
            className={modalOverlayClasses}
          />
          <animated.div style={style} className={modalClasses}>
            <button
              onClick={() => setOpened(false)}
              className={closeButtonClasses}
            >
              <AiOutlineClose />
            </button>
            <div className={twMerge(modalTitleClasses, "pr-6")}>
              Are you sure you want to delete this post?
            </div>
            <form onSubmit={submitHandler} className="flex pb-4 gap-2">
              <ModalButton
                onClick={() => setOpened(false)}
                additionalClasses="bg-red-8 font-bold"
              >
                Delete
              </ModalButton>
              <ModalButton
                onClick={() => setOpened(false)}
                type="button"
                additionalClasses="bg-blue-8"
              >
                Cancel
              </ModalButton>
            </form>
          </animated.div>
        </>
      )
  );
};

export default DeletePostModal;
