import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../interfaces/blog";
import BlogService from "../../services/BlogService";
import { formatDate } from "../../utils/date";
import sanitize from "../../utils/purify";
import CommentList from "./CommentList";
import NewComment from "./NewComment";

import "./styles.scss";

const SinglePost = () => {
  const { postId } = useParams();

  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (postId) {
          const response = await BlogService.getPost(postId);
          setPost(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="single-post">
      <div className="container">
        {post ? (
          <>
            <header className="single-post__header">
              <h2 className="single-post__title">{post?.title}</h2>
              <p className="single-post__date">
                {formatDate(post?.publish_date)}
              </p>
              <img
                src={`https://picsum.photos/1280/500?grayscale&random=${post?.id}`}
                alt="Random generated for blog post"
                className="single-post__banner"
              />
            </header>

            <div className="single-post__content">
              {post?.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitize(post.content),
                  }}
                ></div>
              )}
              <CommentList />
            </div>
          </>
        ) : (
          <p className="single-post__error">No post found :(</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
