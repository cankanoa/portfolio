
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Description from "@/components/Description";
import BlogSection from "@/components/BlogSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
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
