import { ArrowUp } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 border-t bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-2">
              Rakhi
            </h3>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer & UI/UX Designer
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rakhi. All rights reserved.
            </p>
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={scrollToTop}
            className="rounded-full"
            data-testid="button-back-to-top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
