import { Post } from "../../interfaces/blog";
import sanitize from "../../utils/purify";

import "./styles.scss";

interface Props {
  post: Post;
}

const BlogPost = ({ post }: Props) => {
  return (
    <div className="post">
      <h3 className="post__title">{post.author}</h3>
      <p className="post__date">{post.publish_date}</p>
      <div
        className="post__content"
        dangerouslySetInnerHTML={{
          __html: sanitize(post.content),
        }}
      ></div>
    </div>
  );
};

export default BlogPost;
