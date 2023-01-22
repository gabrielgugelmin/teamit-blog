import { useEffect, useState } from "react";
import { CommentWithId } from "../../../interfaces/blog";
import BlogService from "../../../services/BlogService";
import { formatDateToSave } from "../../../utils/date";
import "./styles.scss";

interface Props {
  postId: string | undefined;
  parentId: number | null;
  fetchComments: Function;
  isEditing?: boolean;
  comment?: CommentWithId;
  closeComment?: Function;
}

const NewComment = ({
  comment,
  fetchComments,
  isEditing,
  parentId,
  postId,
  closeComment,
}: Props) => {
  const [text, setText] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    isEditing && comment?.content && setText(comment?.content);
  }, [isEditing]);

  const onSubmit = async () => {
    const isValid = getHasError();

    if (isValid) {
      postId &&
        (await BlogService.addComment({
          postId: Number(postId),
          parent_id: parentId || null,
          user: "Team.it",
          date: formatDateToSave(),
          content: text,
        }));

      finishCommenting();
    }
  };

  const onEdit = async () => {
    const isValid = getHasError();

    if (isValid) {
      comment &&
        postId &&
        (await BlogService.editComment(comment, postId, text));
      finishCommenting();
    }
  };

  const handleSendClick = () => {
    isEditing ? onEdit() : onSubmit();
  };

  const finishCommenting = async (): Promise<void> => {
    setText("");
    await fetchComments();
    closeComment && closeComment();
  };

  const getHasError = (): boolean => {
    const isValid = !!text || false;
    setHasError(!isValid);
    return !!text || false;
  };

  return (
    <div className="new-comment">
      <textarea
        className="new-comment__textarea"
        onChange={event => setText(event.target.value)}
        value={text}
      />
      <footer className="new-comment__footer">
        <span
          className={`new-comment__error ${
            hasError && "new-comment__error--visible"
          }`}
        >
          Your comment can't be empty
        </span>

        <button className="new-comment__submit" onClick={handleSendClick}>
          send
        </button>
      </footer>
    </div>
  );
};

export default NewComment;
