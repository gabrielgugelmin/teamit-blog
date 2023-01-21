import { Post, Comment, CommentWithId } from "../interfaces/blog";
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

  async getPostComments(postId: string): Promise<CommentWithId[]> {
    const { data } = await api().get(`/posts/${postId}/comments`);
    return data;
  }
  async addComment(comment: Comment): Promise<void> {
    const { content, date, parent_id, postId, user } = comment;

    await api().post(`/posts/${postId}/comments`, {
      postId,
      parent_id,
      user,
      date,
      content,
    });
  }
}

const service = new BlogService();
export default service;
