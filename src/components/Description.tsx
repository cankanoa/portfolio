
import { Button } from "@/components/ui/button";
import { Mail, Github, Instagram, Linkedin } from "lucide-react";

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
          
          <div className="pt-6 flex flex-col items-center gap-6">
            <Button asChild size="lg" className="group">
              <a href="mailto:cankanoa@gmail.com">
                Get In Touch
                <Mail className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <div className="flex items-center justify-center gap-6">
              <a href="https://instagram.com/can.kanoa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                <Instagram size={24} aria-label="Instagram" />
              </a>
              <a href="https://github.com/cankanoa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                <Github size={24} aria-label="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/cankanoa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                <Linkedin size={24} aria-label="LinkedIn" />
              </a>
              <a href="https://orcid.org/0009-0009-5520-1911" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-current" aria-label="ORCID">
                  <span className="font-bold text-xs">iD</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
