import { CommentWithChildren } from "../../../interfaces/blog";
import { formatDate } from "../../../utils/date";

import "./styles.scss";

interface Props {
  comment: CommentWithChildren;
  postId: string | undefined;
}

const CommentItem = ({ comment, postId }: Props) => {
  const { content, id, date, parent_id, user, children } = comment;
  return (
    <div className="comment">
      <div className="comment__avatar">{user.substring(0, 1)}</div>
      <div className="comment__container">
        <div className="comment__box">
          <p className="comment__text">{content}</p>
        </div>
        <footer className="comment__footer">
          <span className="comment__date">{formatDate(date)}</span>
          <button className="comment__reply">reply</button>
        </footer>

        {children?.map(childComment => (
          <CommentItem comment={childComment} postId={postId} />
        ))}
        {/* <NewComment postId={postId} parentId={parent_id} /> */}
      </div>
    </div>
  );
};

export default CommentItem;
