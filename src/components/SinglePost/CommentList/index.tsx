import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../../../services/BlogService";
import { CommentWithChildren, CommentWithId } from "../../../interfaces/blog";
import CommentItem from "../Comment";

import "./styles.scss";
import NewComment from "../NewComment";

const CommentList = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentWithId[]>();

  const fetchComments = useCallback(async () => {
    try {
      if (postId) {
        const response = await BlogService.getPostComments(postId);
        setChildrenComments(response);
      }
    } catch (error) {
      console.error(error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, []);

  const setChildrenComments = (comments: CommentWithChildren[]) => {
    const nest = (
      items: CommentWithChildren[],
      id: number | null = null
    ): CommentWithChildren[] =>
      items
        .filter(comment => comment.parent_id === id)
        .map(comment => ({ ...comment, children: nest(items, comment.id) }))
        .sort(
          (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
        );

    setComments(nest(comments));
  };

  return (
    <div className="comments">
      <div className="comments__header">
        <h3 className="comments__title">what's on your mind?</h3>
        <NewComment
          postId={postId}
          parentId={null}
          fetchComments={fetchComments}
        />
      </div>
      {comments?.map(comment => (
        <CommentItem
          comment={comment}
          key={comment.id}
          postId={postId}
          fetchComments={fetchComments}
        />
      ))}
    </div>
  );
};

export default CommentList;
