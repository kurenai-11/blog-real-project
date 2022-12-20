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
import { useCreatePostMutation } from "../api/apiSlice";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";

const ZCreatePostData = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
type ModalProps = {
  currentBlog: number;
  refetch: () => QueryActionCreatorResult<any>;
};

const CreatePostModal = ({ currentBlog, refetch }: ModalProps) => {
  const authKey = useAuthKey();
  const userId = useAppSelector((state) => state.user._id);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [title, content] = [formData.get("title"), formData.get("content")];
    const postData = ZCreatePostData.safeParse({ title, content });
    if (!postData.success) {
      console.log("Post cannot be created", postData.error);
      return;
    }
    const response = await createPost({
      title: postData.data.title,
      content: postData.data.content,
      userId,
      authKey,
      blogId: currentBlog,
    }).unwrap();
    if (response.status === "success") {
      refetch();
      window.location.hash = "#";
    } else {
      console.log("Post could not be created", response.error);
    }
  };
  return (
    <div id="createPost" className={modalOverlayClasses}>
      <div className={modalClasses}>
        <a href="#" className={closeButtonClasses}>
          <AiOutlineClose />
        </a>
        <div className={modalTitleClasses}>Create a post</div>
        <form onSubmit={submitHandler} className="w-full px-4 pb-2">
          <ModalInput
            name="title"
            placeholder="Title"
            additionalClasses="placeholder-text-center text-center"
          />
          <ModalTextArea
            name="content"
            placeholder="Content"
            additionalClasses="h-72"
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

export default CreatePostModal;
