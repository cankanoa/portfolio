
import { useState, useMemo } from "react";
import { blogs, getAllCategories, getAllFocusAreas } from "@/data/blogs";
import BlogItem from "./BlogItem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

export default function BlogSection() {
  const [searchText, setSearchText] = useState("");
  const [focusFilter, setFocusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const focusAreas = getAllFocusAreas();
  const categories = getAllCategories();
  
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        // Apply focus filter
        if (focusFilter && blog.focus !== focusFilter) return false;
        // Apply category filter
        if (categoryFilter && blog.category !== categoryFilter) return false;
        // Apply search text filter
        if (searchText && !blog.title.toLowerCase().includes(searchText.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => new Date(b.mainDate).getTime() - new Date(a.mainDate).getTime());
  }, [searchText, focusFilter, categoryFilter]);

  const clearFilters = () => {
    setFocusFilter(null);
    setCategoryFilter(null);
    setSearchText("");
  };

  const hasActiveFilters = focusFilter !== null || categoryFilter !== null || searchText !== "";

  return (
    <section className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Featured Work</h2>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Search by title..."
              className="w-full pl-10 py-2 pr-4 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          
          {/* Filter section */}
          <div className="space-y-3">
            {/* Focus filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center text-sm font-medium text-foreground">
                Focus:
              </span>
              
              <div className="flex flex-wrap gap-2">
                {focusAreas.map(focus => (
                  <Badge
                    key={focus}
                    variant={focusFilter === focus ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/20"
                    onClick={() => setFocusFilter(focusFilter === focus ? null : focus)}
                  >
                    {focus}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Category filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center text-sm font-medium text-foreground">
                Category:
              </span>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={categoryFilter === category ? "secondary" : "outline"}
                    className="cursor-pointer hover:bg-secondary/20"
                    onClick={() => setCategoryFilter(categoryFilter === category ? null : category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm flex items-center"
                >
                  <X className="h-3 w-3 mr-1" /> Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="divide-y">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <BlogItem key={blog.id} blog={blog} />
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No blog posts found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

