"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error handling component for the application
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
      
      <p className="mb-6 text-foreground/70 max-w-lg">
        We encountered an unexpected error. Our team has been notified and will look into it.
      </p>
      
      {/* Error details for development */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md max-w-2xl overflow-auto text-left">
          <p className="font-mono text-sm text-red-700 mb-2">{error.name}: {error.message}</p>
          {error.digest && (
            <p className="font-mono text-xs text-red-500 mt-2">Error ID: {error.digest}</p>
          )}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Try again
        </button>
        
        <Link
          href="/"
          className="px-6 py-3 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}
