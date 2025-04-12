import React, { useState, useMemo } from "react";
import { blogs, getAllCategories } from "@/data/blogs";
import BlogItem from "./BlogItem";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export default function BlogSection() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = getAllCategories();
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      // Apply category filter (show all if none selected)
      if (selectedCategories.length > 0 && !selectedCategories.includes(blog.category)) return false;

      // Apply search text filter
      if (searchText && !blog.title.toLowerCase().includes(searchText.toLowerCase())) return false;
      return true;
    }).sort((a, b) => new Date(b.mainDate).getTime() - new Date(a.mainDate).getTime());
  }, [searchText, selectedCategories]);
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };
  return <section className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Featured Work</h2>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search by title..." className="w-full pl-10 py-2 pr-4 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          
          {/* Filter section - only category filter remains */}
          <div className="space-y-3">
            {/* Category filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center text-sm font-medium text-foreground">Filter:</span>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => <Badge key={category} variant={selectedCategories.includes(category) ? "default" : "outline"} className="cursor-pointer hover:bg-primary/20" onClick={() => toggleCategory(category)}>
                    {category}
                  </Badge>)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-transparent">
          {filteredBlogs.length > 0 ? <>
              {filteredBlogs.map((blog, index) => <React.Fragment key={blog.id}>
                  <BlogItem blog={blog} />
                  {index < filteredBlogs.length - 1 && <Separator className="my-4" />}
                </React.Fragment>)}
            </> : <div className="py-16 text-center">
              <p className="text-muted-foreground">No blog posts found. Try adjusting your filters.</p>
            </div>}
        </div>
      </div>
    </section>;
}