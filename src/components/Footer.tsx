export const Footer = () => {
  return (
    <footer className="bg-background border-t border-foreground/10 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/70">
            &copy; {new Date().getFullYear()} Vibe Coding Jam. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
