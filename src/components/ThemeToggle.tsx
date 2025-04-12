
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme } = useTheme();
  
  // Since we're using system theme only, this component now just displays
  // the current theme icon without allowing changes
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        disabled={true} // Disabled since we're using system theme only
        className="rounded-full bg-background/50 backdrop-blur-sm cursor-default"
      >
        {theme === 'dark' ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">System theme</span>
      </Button>
    </div>
  );
}
