
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug, BlogMeta } from "@/utils/blogUtils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import MDXContent from "@/components/MDXContent";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) {
        setError("Blog post not found");
        setLoading(false);
        return;
      }

      try {
        const blogData = await getBlogBySlug(slug);
        if (blogData) {
          setBlog(blogData);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        setError("Failed to load blog post");
        console.error("Error loading blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMMM d, yyyy");
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4">
        <p className="text-center">Loading blog post...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-semibold mb-4">{error}</h1>
          <Link to="/" className="text-primary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-background">
      <div className="container max-w-4xl mx-auto">
        <Link to="/" className="text-primary hover:underline flex items-center gap-2 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <header className="mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold">{blog.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default" className="bg-primary/70">
                {blog.category}
              </Badge>
              
              <span className="text-sm text-muted-foreground">
                {formatDate(blog.mainDate)}
                {blog.optionalEndDate && (
                  <>
                    <span className="mx-2">—</span>
                    {formatDate(blog.optionalEndDate)}
                  </>
                )}
              </span>
            </div>
            
            <p className="text-xl text-muted-foreground">{blog.summary}</p>
          </div>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          <MDXContent content={blog.content} />
        </article>
      </div>
    </div>
  );
}
