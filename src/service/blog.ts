import { readFile } from "fs/promises";
import path from "path";

export type BlogPost = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
  type: string;
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const filePath = path.join(process.cwd(), "data", "blogPosts.json");
  return readFile(filePath, "utf-8")
    .then<BlogPost[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
}
