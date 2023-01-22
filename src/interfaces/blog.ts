export interface Post {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  slug: string;
  description: string;
  content: string;
}

export interface Comment {
  postId: number;
  parent_id: number | null;
  user: string;
  date: string;
  content: string;
}

export interface CommentWithId extends Comment {
  children: any;
  id: number;
}

export interface CommentWithChildren extends CommentWithId {
  children: CommentWithId[];
}
