import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
      <p className="text-foreground/70 mb-8 text-center max-w-md">
        The project you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Link 
        href="/projects" 
        className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
      >
        &larr; Back to all projects
      </Link>
    </div>
  );
}
