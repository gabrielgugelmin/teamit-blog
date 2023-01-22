import { useState } from "react";
import { CommentWithChildren } from "../../../interfaces/blog";
import { formatDate } from "../../../utils/date";
import NewComment from "../NewComment";

import "./styles.scss";

interface Props {
  comment: CommentWithChildren;
  postId: string | undefined;
  fetchComments: Function;
}

const CommentItem = ({ comment, postId, fetchComments }: Props) => {
  const { content, id, date, user, children } = comment;
  const [isAddCommentVisible, setIsAddCommentVisible] =
    useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // mock verify user logged
  const isCommentFromUser = (): boolean => {
    return comment.user === "Team.it";
  };

  const onReplyOrEdit = (isEditing: boolean) => {
    setIsAddCommentVisible(prevState => !prevState);

    setIsEditing(isEditing);
  };

  return (
    <div className="comment">
      <div className="comment__container">
        <div className="comment__avatar">{user.substring(0, 1)}</div>
        <div className="comment__content">
          <div className="comment__box">
            <p className="comment__text">{content}</p>
          </div>
          <footer className="comment__footer">
            <span className="comment__date">{formatDate(date)}</span>
            <button
              className="comment__reply"
              onClick={() => onReplyOrEdit(false)}
            >
              reply
            </button>
            {isCommentFromUser() && (
              <button
                className="comment__reply"
                onClick={() => onReplyOrEdit(true)}
              >
                edit
              </button>
            )}
          </footer>

          {isAddCommentVisible && (
            <NewComment
              comment={comment}
              fetchComments={fetchComments}
              isEditing={isEditing}
              parentId={id}
              postId={postId}
              closeComment={() => setIsAddCommentVisible(false)}
            />
          )}
        </div>
      </div>
      <div className="comment__children">
        {children?.map(childComment => (
          <CommentItem
            comment={childComment}
            fetchComments={fetchComments}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentItem;
