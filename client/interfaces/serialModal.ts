import { BlogItem } from "./blogModal";

export interface Serial {
  title: string;
  description?: string;
  imageUrl?: string;
  blogs: BlogItem[]
}
