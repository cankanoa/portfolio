
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Description() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center space-y-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">About Kanoa</h2>
          
          <div className="space-y-4 md:text-lg">
            <p>
              Kanoa Lindiwe bridges the unexpected worlds of juggling and geography, finding harmony in their shared principles of space, movement, and pattern recognition.
            </p>
            
            <p>
              As a professional juggler with over 15 years of experience, Kanoa has performed across five continents, 
              bringing technical precision and artistic expression to both traditional and experimental juggling techniques. 
              His unique style incorporates elements from his geographical research, creating performances that tell stories of place and space.
            </p>
            
            <p>
              With a PhD in Human Geography from the University of Edinburgh, Kanoa's academic work explores the intersection of performance art, public spaces, and community engagement. 
              His research has been published in leading journals and has influenced urban planning projects focused on creating more vibrant public spaces.
            </p>
          </div>
          
          <div className="pt-6">
            <Button asChild size="lg" className="group">
              <a href="mailto:cankanoa@gmail.com">
                Get In Touch
                <Mail className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
