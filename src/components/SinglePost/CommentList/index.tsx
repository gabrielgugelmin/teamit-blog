import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../../../services/BlogService";
import { CommentWithChildren, CommentWithId } from "../../../interfaces/blog";
import CommentItem from "../Comment";

import "./styles.scss";
import NewComment from "../NewComment";

const CommentList = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentWithId[]>();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (postId) {
          const response = await BlogService.getPostComments(postId);
          setChildrenComments(response);
          // setComments(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  const setChildrenComments = (comments: CommentWithChildren[]) => {
    const nest = (
      items: CommentWithChildren[],
      id: number | null = null
    ): CommentWithChildren[] =>
      items
        .filter(comment => comment.parent_id === id)
        .map(comment => ({ ...comment, children: nest(items, comment.id) }));

    setComments(nest(comments));
  };

  return (
    <div className="comments">
      <div className="comments__header">
        <h3 className="comments__title">what's on your mind?</h3>
        <NewComment postId={postId} parentId={null} />
      </div>
      {comments?.map(comment => (
        <CommentItem comment={comment} key={comment.id} postId={postId} />
      ))}
    </div>
  );
};

export default CommentList;
