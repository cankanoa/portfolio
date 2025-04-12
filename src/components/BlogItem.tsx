
import React from "react";
import { Blog } from "@/data/blogs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface BlogItemProps {
  blog: Blog;
}

export default function BlogItem({ blog }: BlogItemProps) {
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMMM d, yyyy");
  };
  
  const slug = blog.title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')  // Remove punctuation
    .replace(/\s+/g, '-');    // Replace spaces with hyphens

  return (
    <div className="py-6 px-4 animate-fade-in">
      <div className="space-y-3">
        {/* Date moved to the top */}
        <div className="text-sm text-muted-foreground">
          {formatDate(blog.mainDate)}
          {blog.optionalEndDate && (
            <>
              <span className="mx-2">—</span>
              {formatDate(blog.optionalEndDate)}
            </>
          )}
        </div>
        
        <h3 className="text-2xl font-serif font-medium">
          <Link to={`/blog/${slug}`} className="hover:text-primary transition-colors">
            {blog.title}
          </Link>
        </h3>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="bg-primary/70">
            {blog.category}
          </Badge>
        </div>
      </div>
    </div>
  );
}
