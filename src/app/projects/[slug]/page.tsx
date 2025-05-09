import { VoteButton } from "@/components/VoteButton";
import { WikiContent } from "@/components/WikiContent";
import { Project } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProject(slug: string): Promise<Project | null> {
  try {
    // In a real app, we'd use an environment variable for the API URL
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/projects/${slug}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch project: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.project;
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    throw error;
  }
}

export default async function ProjectDetailsPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = await getProject(params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1 mb-4"
        >
          <span>←</span> Back to all projects
        </Link>
        
        <div className="flex flex-wrap justify-between items-start gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
          
          <VoteButton 
            projectSlug={project.slug}
            initialVotes={project.voteCount}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-xl font-semibold mb-4">About this project</h2>
            <p className="text-foreground/80">{project.description}</p>
          </div>
          
          {/* Wiki content from Azure DevOps */}
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <WikiContent projectSlug={project.slug} />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-lg font-semibold mb-3">Team</h2>
            <ul className="space-y-1">
              {project.teamMembers.map((member) => (
                <li key={member} className="text-foreground/70">{member}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-lg font-semibold mb-3">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-2 py-1 text-xs bg-foreground/10 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-6">
            <h2 className="text-lg font-semibold mb-3">Links</h2>
            <ul className="space-y-2">
              {project.repoUrl && (
                <li>
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    Repository
                  </a>
                </li>
              )}
              {project.demoUrl && (
                <li>
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    Live Demo
                  </a>
                </li>
              )}
              {project.wikiUrl && (
                <li>
                  <a 
                    href={project.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    Wiki Page
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
