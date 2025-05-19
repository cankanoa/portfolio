
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

// Helper function similar to the one you provided to parse frontmatter
function parseFrontmatter(fileContent: string) {
  const { data, content } = matter(fileContent);
  
  return {
    metadata: {
      title: data.title,
      category: data.category,
      mainDate: data.mainDate,
      optionalEndDate: data.optionalEndDate,
      summary: data.summary
    },
    content
  };
}

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
        // Parse frontmatter using our helper function
        const { metadata, content: mdxContent } = parseFrontmatter(content);
        const filename = path.split('/').pop() || '';
        const slug = filename.replace(/\.mdx$/, '');
        
        blogs.push({
          id: slug,
          slug,
          title: metadata.title,
          category: metadata.category,
          mainDate: metadata.mainDate,
          optionalEndDate: metadata.optionalEndDate,
          summary: metadata.summary,
          content: mdxContent
        });
      } catch (e) {
        console.error(`Error processing MDX file ${path}:`, e);
      }
    }
    
    // Sort blogs by date (newest first)
    const sortedBlogs = blogs.sort((a, b) => {
      return new Date(b.mainDate).getTime() - new Date(a.mainDate).getTime();
    });
    
    // Log what we found for debugging purposes
    console.log(`Found ${sortedBlogs.length} blog posts:`, sortedBlogs.map(b => b.slug));
    
    blogCache = sortedBlogs;
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

// Similar to your formatDate function
export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
