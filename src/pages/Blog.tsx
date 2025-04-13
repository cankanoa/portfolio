
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogMeta, BlogMeta } from "@/utils/blogUtils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getAllBlogMeta();
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMMM d, yyyy");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl px-4 py-16 mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-12">Blog</h1>
          <div className="text-center py-8">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl px-4 py-16 mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-12">Blog</h1>
        
        <div className="space-y-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="border-b border-border pb-8">
              <div className="text-sm text-muted-foreground mb-2">
                {formatDate(blog.mainDate)}
                {blog.optionalEndDate && (
                  <>
                    <span className="mx-2">—</span>
                    {formatDate(blog.optionalEndDate)}
                  </>
                )}
              </div>
              
              <h2 className="text-2xl font-serif font-medium mb-3">
                <Link 
                  to={`/blog/${blog.slug}`} 
                  className="hover:text-primary transition-colors"
                >
                  {blog.title}
                </Link>
              </h2>
              
              <div className="mb-3">
                <Badge variant="default" className="bg-primary/70">
                  {blog.category}
                </Badge>
              </div>
              
              <p className="text-muted-foreground">{blog.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
