
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

// Sample blog data as fallback when gray-matter has browser issues
const sampleBlogs: BlogMeta[] = [
  {
    id: 'geography-and-juggling',
    slug: 'geography-and-juggling',
    title: 'The Intersection of Geography and Juggling',
    category: 'Geography',
    mainDate: '2024-01-15',
    optionalEndDate: '2024-02-28',
    summary: 'Exploring how geographical concepts apply to the art of juggling and performance spaces around the world.',
    content: `# The Intersection of Geography and Juggling

As both a geographer and a juggler, I've often found fascinating parallels between these seemingly disparate disciplines.

## Spatial Awareness

Juggling requires an acute sense of spatial awareness - understanding the arcs, trajectories, and timing of objects in motion. This mirrors how geographers study spatial relationships and movement patterns.

## Cultural Geography of Circus Arts

Different regions around the world have developed unique juggling and circus traditions:

- **China**: Diabolo and plate spinning with emphasis on precision
- **India**: Club manipulation with rhythmic elements
- **Europe**: Technical ball juggling with mathematical approaches

## Performance Spaces

The geography of performance spaces - from street corners to grand theaters - affects juggling styles and audience engagement. Urban planning directly impacts where and how circus arts can thrive in public spaces.

## Conclusion

By viewing juggling through a geographical lens, we gain new insights into spatial relationships, cultural diffusion, and the importance of place in the development of physical arts.`
  }
];

// Cache the blog data to avoid processing on every request
let blogCache: BlogMeta[] | null = null;

export const getAllBlogMeta = async (): Promise<BlogMeta[]> => {
  if (blogCache) return blogCache;

  try {
    let blogs: BlogMeta[] = [];
    
    try {
      // Try to use import.meta.glob, but it might fail in certain environments
      const blogFiles = import.meta.glob('/src/content/blog/*.mdx', { as: 'raw', eager: true });
      
      // Process each blog file
      for (const path in blogFiles) {
        const content = blogFiles[path];
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
      }
    } catch (e) {
      console.warn("Failed to process MDX with gray-matter, using sample data:", e);
      // Fall back to sample blogs if we encounter issues
      blogs = [...sampleBlogs];
    }
    
    // Sort blogs by date (newest first)
    blogCache = blogs.sort((a, b) => 
      new Date(b.mainDate).getTime() - new Date(a.mainDate).getTime()
    );
    
    return blogCache;
  } catch (error) {
    console.error("Error processing blog files:", error);
    // Return sample blogs as fallback
    return sampleBlogs;
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
