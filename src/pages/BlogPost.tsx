
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlogMetaBySlug } from "@/utils/mdxUtils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

interface BlogPostContentProps {
  slug: string;
}

// This component would normally render MDX content
// For this demo, we'll use dummy content
const BlogPostContent: React.FC<BlogPostContentProps> = ({ slug }) => {
  // In a real app, this would dynamically import and render the MDX
  return (
    <div className="prose prose-stone dark:prose-invert max-w-none">
      <p>This is the content for blog post with slug: {slug}</p>
      <p>In a real app, this would render the actual MDX content from the file.</p>
      <h2>Section Title</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h3>Subsection</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <blockquote>
        <p>This is an important quote from the article that highlights a key concept.</p>
      </blockquote>
      <p>The conclusion summarizes the main points and provides insights for further exploration.</p>
    </div>
  );
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  if (!slug) {
    return <div>Error: No slug provided</div>;
  }
  
  const blogMeta = getBlogMetaBySlug(slug);
  
  if (!blogMeta) {
    return (
      <div className="container max-w-4xl px-4 py-16 mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold mb-8">Blog Post Not Found</h1>
        <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    );
  }
  
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMMM d, yyyy");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl px-4 py-16 mx-auto">
        <div className="mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          
          <div className="text-sm text-muted-foreground mb-4">
            {formatDate(blogMeta.mainDate)}
            {blogMeta.optionalEndDate && (
              <>
                <span className="mx-2">—</span>
                {formatDate(blogMeta.optionalEndDate)}
              </>
            )}
          </div>
          
          <h1 className="text-4xl font-serif font-bold mb-4">{blogMeta.title}</h1>
          
          <div className="mb-8">
            <Badge variant="default" className="bg-primary/70">
              {blogMeta.category}
            </Badge>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12">{blogMeta.summary}</p>
        </div>
        
        <div className="border-t border-border pt-8">
          <BlogPostContent slug={slug} />
        </div>
      </div>
    </div>
  );
}
