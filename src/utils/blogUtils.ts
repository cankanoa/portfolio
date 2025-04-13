
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

// Use Vite's import.meta.glob to import all MDX files statically
const blogFiles = import.meta.glob('/src/content/blog/*.mdx', { as: 'raw', eager: true });

// Cache the blog data to avoid processing on every request
let blogCache: BlogMeta[] | null = null;

export const getAllBlogMeta = async (): Promise<BlogMeta[]> => {
  if (blogCache) return blogCache;

  try {
    const blogs: BlogMeta[] = [];
    
    // Process each blog file
    for (const path in blogFiles) {
      const content = blogFiles[path];
      
      try {
        // Use gray-matter without relying on Buffer
        const { data, content: mdxContent } = matter(content);
        const filename = path.split('/').pop() || '';
        const slug = filename.replace(/\.mdx$/, '');
        
        blogs.push({
          id: slug,
          slug,
          title: data.title,
          category: data.category,
          mainDate: data.mainDate,
          optionalEndDate: data.optionalEndDate,
          summary: data.summary,
          content: mdxContent
        });
      } catch (e) {
        console.error(`Error processing MDX file ${path}:`, e);
      }
    }
    
    // Sort blogs by date (newest first)
    blogCache = blogs.sort((a, b) => {
      return new Date(b.mainDate).getTime() - new Date(a.mainDate).getTime();
    });
    
    return blogCache;
  } catch (error) {
    console.error("Error processing blog files:", error);
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
