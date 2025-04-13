
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogMeta {
  id: string;
  slug: string;
  title: string;
  category: string;
  mainDate: string;
  optionalEndDate?: string;
  summary: string;
  content: string;
}

// Cache the blog data to avoid reading from disk on every request
let blogCache: BlogMeta[] | null = null;

export const getAllBlogMeta = async (): Promise<BlogMeta[]> => {
  if (blogCache) return blogCache;

  try {
    const blogDir = path.join(process.cwd(), 'src/content/blog');
    const filenames = await fs.readdir(blogDir);
    
    const blogs = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(async (filename) => {
          const filePath = path.join(blogDir, filename);
          const fileContent = await fs.readFile(filePath, 'utf8');
          
          const { data, content } = matter(fileContent);
          const slug = filename.replace(/\.mdx$/, '');
          
          return {
            id: slug,
            slug,
            title: data.title,
            category: data.category,
            mainDate: data.mainDate,
            optionalEndDate: data.optionalEndDate,
            summary: data.summary,
            content
          } as BlogMeta;
        })
    );
    
    // Sort blogs by date (newest first)
    blogCache = blogs.sort((a, b) => 
      new Date(b.mainDate).getTime() - new Date(a.mainDate).getTime()
    );
    
    return blogCache;
  } catch (error) {
    console.error("Error reading blog files:", error);
    return [];
  }
};

export const getBlogBySlug = async (slug: string): Promise<BlogMeta | undefined> => {
  const blogs = await getAllBlogMeta();
  return blogs.find(blog => blog.slug === slug);
};

export const getAllCategories = async (): Promise<string[]> => {
  const blogs = await getAllBlogMeta();
  const categoriesSet = new Set(blogs.map(blog => blog.category));
  return Array.from(categoriesSet);
};
