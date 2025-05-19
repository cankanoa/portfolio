
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

// Custom frontmatter parser that doesn't rely on Node's Buffer
function parseFrontmatter(fileContent: string) {
  // Extract the frontmatter section between --- markers
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  
  if (!match || !match[1]) {
    throw new Error('No frontmatter found in MDX file');
  }
  
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const data: Record<string, any> = {};

  // Parse each line in the frontmatter
  frontMatterLines.forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove surrounding quotes if they exist
      value = value.replace(/^['"](.*)['"]$/, '$1');
      data[key] = value;
    }
  });
  
  return {
    metadata: {
      title: data.title || '',
      category: data.category || '',
      mainDate: data.mainDate || '',
      optionalEndDate: data.optionalEndDate,
      summary: data.summary || ''
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
        console.log(`Processing file: ${path}`);
        // Parse frontmatter using our custom function
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

// Format date for display
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
