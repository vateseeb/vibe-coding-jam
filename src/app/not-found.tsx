import Link from "next/link";

/**
 * Global 404 page for routes that don't exist
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="mb-6">
        <span className="text-8xl font-bold text-primary opacity-50">404</span>
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      
      <p className="mb-8 text-foreground/70 max-w-lg">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Go back home
        </Link>
        
        <Link
          href="/projects"
          className="px-6 py-3 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
        >
          View projects
        </Link>
      </div>
    </div>
  );
}
