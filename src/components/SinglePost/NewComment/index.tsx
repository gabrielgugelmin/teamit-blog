import { useState } from "react";
import BlogService from "../../../services/BlogService";
import { formatDateToSave } from "../../../utils/date";
import "./styles.scss";

interface Props {
  postId: string | undefined;
  parentId: number | null;
}

const NewComment = ({ postId, parentId }: Props) => {
  const [text, setText] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const onSubmit = (event: React.MouseEvent<HTMLElement>) => {
    if (!text) {
      setHasError(true);
    } else {
      setHasError(false);

      postId &&
        BlogService.addComment({
          postId: Number(postId),
          parent_id: parentId || null,
          user: "Team.it",
          date: formatDateToSave(),
          content: text,
        });
    }
  };

  return (
    <div className="new-comment">
      <textarea
        className="new-comment__textarea"
        onChange={event => setText(event.target.value)}
      />
      <span
        className={`new-comment__error ${
          hasError && "new-comment__error--visible"
        }`}
      >
        Your comment can't be empty
      </span>

      <button
        className="new-comment__submit"
        onClick={event => onSubmit(event)}
      >
        send
      </button>
    </div>
  );
};

export default NewComment;
