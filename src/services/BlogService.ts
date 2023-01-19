import { Post } from "../interfaces/blog";
import api from "./index";

export class BlogService {
  async getAllPosts(): Promise<Post[]> {
    const { data } = await api().get("posts");
    return data;
  }

  async getPost(postId: string): Promise<Post> {
    const { data } = await api().get(`/posts/${postId}`);
    return data;
  }
}

const service = new BlogService();
export default service;
