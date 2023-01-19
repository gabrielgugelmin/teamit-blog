import { Post } from "../../interfaces/blog";
import sanitize from "../../utils/purify";

import "./styles.scss";

interface Props {
  post: Post;
}

const BlogPost = ({ post }: Props) => {
  return (
    <div className="post">
      <div className="post__img">
        <img
          src={`https://picsum.photos/340/220?random=${post.id}`}
          alt="Random generated for blog post"
        />
      </div>
      <div className="post__content">
        <h3 className="post__title">{post.title}</h3>
        <span className="post__info">
          {post.author} ● {post.publish_date}
        </span>
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default BlogPost;
