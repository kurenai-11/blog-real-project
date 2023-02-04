import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { animated } from "@react-spring/web";
import { useAppSelector, useAuthKey } from "../../app/hooks";
import { Blog } from "../../app/types";
import { useCreateBlogMutation, useEditBlogMutation } from "../api/apiSlice";
import ModalButton from "../shared/ModalButton.component";
import ModalInput from "../shared/ModalInput.component";
import ModalTextArea from "../shared/ModalTextarea.component";
import {
  closeButtonClasses,
  modalClasses,
  modalOverlayClasses,
  modalTitleClasses,
  useModalTransition,
} from "../shared/utils";

type ModalProps = {
  modalTitle: string;
  setOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  opened: boolean;
} & (
  | {
      modalTitle: string;
      type: "editBlog";
      currentBlog: Blog;
    }
  | {
      modalTitle: string;
      type: "addBlog";
    }
);

// means Add OR Edit blog modal
const AddEditBlogModal = (props: ModalProps) => {
  const { modalTitle, type, opened, setOpenedModal } = props;
  let currentBlog: Blog = {} as Blog;
  type === "editBlog" ? (currentBlog = props.currentBlog) : null;
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
        blogId: currentBlog._id,
      }).unwrap();
      if (response.status === "success") {
        window.location.hash = "";
      } else {
        // this shouldn't happen...
        console.log("something went wrong...");
      }
    }
  };
  const transition = useModalTransition(opened);
  return transition(
    (style, isOpen) =>
      isOpen && (
        <>
          <animated.div
            style={{ opacity: style.opacity }}
            id={type}
            className={modalOverlayClasses}
          />
          <animated.div style={style} className={modalClasses}>
            <button
              className={closeButtonClasses}
              onClick={() => setOpenedModal(false)}
            >
              <AiOutlineClose />
            </button>
            <div className={modalTitleClasses}>{modalTitle}</div>
            <form className="w-full" onSubmit={submitHandler}>
              <div className="px-3 flex flex-col gap-2 justify-center items-center">
                <span className="text-xl font-bold">Title</span>
                <ModalInput
                  name="title"
                  additionalClasses="text-center"
                  defaultValue={type === "editBlog" ? currentBlog.title : ""}
                />
              </div>
              <div className="px-3 flex flex-col gap-2 justify-center items-center">
                <span className="text-xl font-bold">Description</span>
                <ModalTextArea
                  name="description"
                  defaultValue={
                    type === "editBlog" ? currentBlog.description : ""
                  }
                />
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
                <ModalButton
                  onClick={() => setOpenedModal(false)}
                  type="button"
                >
                  Cancel
                </ModalButton>
              </div>
            </form>
          </animated.div>
        </>
      )
  );
};

export default AddEditBlogModal;
