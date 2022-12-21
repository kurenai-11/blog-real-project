import { AiOutlineClose } from "react-icons/ai";
import ModalButton from "../shared/ModalButton.component";
import ModalInput from "../shared/ModalInput.component";
import ModalTextArea from "../shared/ModalTextarea.component";
import ModalLink from "../shared/ModalLink.component";
import {
  closeButtonClasses,
  modalClasses,
  modalOverlayClasses,
  modalTitleClasses,
} from "../shared/utils";
import { z } from "zod";
import { useAppSelector, useAuthKey } from "../../app/hooks";
import { useCreatePostMutation, useEditPostMutation } from "../api/apiSlice";
import { Post } from "../../app/types";

const ZCreatePostData = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
type ModalProps =
  | { mode: "createPost"; currentBlog: number }
  | { mode: "editPost"; post: Post };

// create OR edit post modal
const CreateEditPostModal = (props: ModalProps) => {
  const authKey = useAuthKey();
  const userId = useAppSelector((state) => state.user._id);
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const [editPost, { isLoading: isEditingPost }] = useEditPostMutation();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [title, content] = [formData.get("title"), formData.get("content")];
    const postData = ZCreatePostData.safeParse({ title, content });
    if (!postData.success) {
      console.log("Post cannot be created/edited", postData.error);
      return;
    }
    if (props.mode === "createPost") {
      const response = await createPost({
        title: postData.data.title,
        content: postData.data.content,
        userId,
        authKey,
        blogId: props.currentBlog,
      }).unwrap();
      if (response.status === "success") {
        window.location.hash = "#";
      } else {
        console.log("Post could not be created", response.error);
      }
    } else {
      const response = await editPost({
        title: postData.data.title,
        content: postData.data.content,
        userId,
        authKey,
        postId: props.post._id,
      }).unwrap();
      if (response.status === "success") {
        window.location.hash = "#";
      } else {
        console.log("Post could not be updated", response.error);
      }
    }
  };
  return (
    <div id={props.mode} className={modalOverlayClasses}>
      <div className={modalClasses}>
        <a href="#" className={closeButtonClasses}>
          <AiOutlineClose />
        </a>
        <div className={modalTitleClasses}>
          {props.mode === "createPost" ? "Create a post" : "Edit a post"}
        </div>
        <form onSubmit={submitHandler} className="w-full px-4 pb-2">
          <ModalInput
            name="title"
            placeholder="Title"
            additionalClasses="placeholder-text-center text-center"
            defaultValue={props.mode === "editPost" ? props.post.title : ""}
          />
          <ModalTextArea
            name="content"
            placeholder="Content"
            additionalClasses="h-72"
            defaultValue={props.mode === "editPost" ? props.post.content : ""}
          />
          <div className="flex justify-center gap-3">
            <ModalButton type="submit" additionalClasses="bg-green-8">
              Submit
            </ModalButton>
            <ModalLink href="#">Cancel</ModalLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditPostModal;
