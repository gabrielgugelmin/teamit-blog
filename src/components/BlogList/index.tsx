import { useEffect, useState } from "react";
import { Post } from "../../interfaces/blog";
import BlogService from "../../services/BlogService";
import BlogPost from "../BlogPost";

import "./styles.scss";
import GridChanger from "./GridChanger";

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isGridView, setIsGridView] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllBlogPosts = async () => {
      try {
        const respose = await BlogService.getAllPosts();
        const sortedRespose = sortPostsByDate(respose);
        setPosts(sortedRespose);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllBlogPosts();
  }, []);

  const sortPostsByDate = (posts: Post[]): Post[] => {
    const sortedArray = posts.sort((a, b) => {
      return (
        new Date(a.publish_date).valueOf() - new Date(b.publish_date).valueOf()
      );
    });

    return sortedArray;
  };

  const handleGridChange = (isGridView: boolean): void => {
    setIsGridView(isGridView);
  };

  return (
    <div className="container">
      <GridChanger
        handleGridChange={handleGridChange}
        isGridView={isGridView}
      />
      <div className={`post-list ${isGridView ? "post-list--grid" : ""}`}>
        {posts.map(post => (
          <BlogPost post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
