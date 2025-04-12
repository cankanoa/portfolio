
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
    <div className="py-6 border-b last:border-b-0 animate-fade-in">
      <div className="space-y-2">
        <h3 className="text-2xl font-serif font-medium">{blog.title}</h3>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-primary/10">
            {blog.focus}
          </Badge>
          <Badge variant="secondary">
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

