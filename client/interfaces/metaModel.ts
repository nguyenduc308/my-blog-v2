import { User } from './userModel';

export interface Like {
  type?: string;
  user_id?: number;
}

export interface Comment {
  id: number;
  content: string;
  comment_id?: number | null | undefined;
  children: Comment[];
  user: User;
  created_at: string;
  updated_at: string;
}

