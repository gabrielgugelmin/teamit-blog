import { useEffect, useState } from "react";
import { Post } from "../../interfaces/blog";
import BlogService from "../../services/BlogService";
import BlogPost from "../BlogPost";

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchAllBlogPosts = async () => {
      try {
        const respose = await BlogService.getAllPosts();
        setPosts(respose);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllBlogPosts();
  }, []);

  return (
    <>
      {posts.map(post => (
        <BlogPost post={post} />
      ))}
    </>
  );
};

export default BlogList;
