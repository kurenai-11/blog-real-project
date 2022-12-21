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
import { useEffect, useState } from "react";

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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  props.mode === "editPost" &&
    useEffect(() => {
      props.post && setTitle(props.post.title);
      props.post && setContent(props.post.content);
    }, [props.post]);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
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
            // I don't know why, but title can be undefined (and I get a warning in the console)
            // so we will explicitly set it to an empty string if it is undefined
            value={title ? title : ""}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ModalTextArea
            name="content"
            placeholder="Content"
            additionalClasses="h-72"
            // I don't know why, but content can be undefined (and I get a warning in the console)
            // so we will explicitly set it to an empty string if it is undefined
            value={content ? content : ""}
            onChange={(e) => setContent(e.target.value)}
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
