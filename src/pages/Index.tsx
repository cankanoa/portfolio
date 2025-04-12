
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Description from "@/components/Description";
import BlogSection from "@/components/BlogSection";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  // Set up light and dark mode to match system preference by default
  useEffect(() => {
    // This will be handled by our useTheme hook
  }, []);

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <Hero />
      <Description />
      <BlogSection />
      
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Kanoa Lindiwe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
