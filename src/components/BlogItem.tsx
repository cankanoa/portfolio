
import { Blog } from "@/data/blogs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface BlogItemProps {
  blog: Blog;
}

export default function BlogItem({ blog }: BlogItemProps) {
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMMM d, yyyy");
  };

  return (
    <div className="py-6 px-4 border-b last:border-b-0 animate-fade-in hover:bg-muted/20 transition-colors">
      <div className="space-y-2">
        <h3 className="text-2xl font-serif font-medium">{blog.title}</h3>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="bg-primary/90">
            {blog.focus}
          </Badge>
          <Badge variant="default" className="bg-primary/70">
            {blog.category}
          </Badge>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {formatDate(blog.mainDate)}
          {blog.optionalEndDate && (
            <>
              <span className="mx-2">—</span>
              {formatDate(blog.optionalEndDate)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
