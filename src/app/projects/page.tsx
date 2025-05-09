import ClientProjectsPage from "@/components/ClientProjectsPage";
import { ProjectSummary } from "@/lib/types";
import Link from "next/link";

async function getProjects(): Promise<ProjectSummary[]> {
  // In a real app, we'd use an environment variable for the API URL
  // and would handle server-side fetching properly
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/projects`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    // This will activate the closest error boundary
    throw new Error('Failed to fetch projects');
  }
  
  const data = await res.json();
  return data.projects;
}

export default async function ProjectsPage() {
  // Fetch projects data
  let projects: ProjectSummary[] = [];
  let error = null;
  
  try {
    projects = await getProjects();
  } catch (e) {
    error = e;
    console.error('Failed to load projects:', e);
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Vibe Coding Jam Projects
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl">
          Explore all the amazing projects from Vibe Coding Jam 2025. Vote for your favorites!
        </p>
      </div>
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          Failed to load projects. Please try again later.
        </div>
      )}
      
      {/* Client-side projects listing with search and filter */}
      {projects.length > 0 ? (
        <ClientProjectsPage initialProjects={projects} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center justify-center h-64 bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <p className="text-center text-foreground/50">
              {error ? 'Failed to load projects' : 'No projects available'}
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-12 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}
