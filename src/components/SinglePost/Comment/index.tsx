import { Comment } from "../../../interfaces/blog";
import { formatDate } from "../../../utils/date";

import "./styles.scss";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const { content, id, date, parent_id, postId, user } = comment;
  return (
    <div className="comment">
      <div className="comment__avatar">{user.substring(0, 1)}</div>
      <div className="comment__container">
        <div className="comment__box">
          <p className="comment__text">{content}</p>
        </div>
        <span className="comment__date">{formatDate(date)}</span>
      </div>
    </div>
  );
};

export default CommentItem;
