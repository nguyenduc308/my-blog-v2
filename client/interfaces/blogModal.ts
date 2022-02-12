import { User } from "./userModel";

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  user: User
}