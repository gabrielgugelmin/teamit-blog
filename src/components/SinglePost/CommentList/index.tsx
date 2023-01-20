import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogService from "../../../services/BlogService";
import { Comment } from "../../../interfaces/blog";
import CommentItem from "../Comment";

const CommentList = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (postId) {
          const response = await BlogService.getPostComments(postId);
          setComments(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <>
      <h2>comments</h2>
      {comments?.map(comment => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </>
  );
};

export default CommentList;
