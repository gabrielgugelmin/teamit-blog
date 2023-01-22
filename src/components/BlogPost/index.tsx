import { Link } from "react-router-dom";
import { Post } from "../../interfaces/blog";
import { formatDate } from "../../utils/date";

import "./styles.scss";

interface Props {
  post: Post;
}

const BlogPost = ({ post }: Props) => {
  return (
    <Link className="post" to={`/post/${post.id}`}>
      <div className="post__img">
        <img
          src={`https://picsum.photos/340/220?grayscale&random=${post.id}`}
          alt="Random generated for blog post"
        />
      </div>
      <div className="post__content">
        <h3 className="post__title">{post.title}</h3>
        <span className="post__info">
          {post.author} ● {formatDate(post.publish_date)}
        </span>
        <p>{post.description}</p>
      </div>
    </Link>
  );
};

export default BlogPost;
