"use client";

import { ProjectSummary } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectCardProps {
  project: ProjectSummary;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [voteCount, setVoteCount] = useState(project.voteCount);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    if (hasVoted || isVoting) return;
    
    setIsVoting(true);
    
    // Optimistic update
    setVoteCount((prev) => prev + 1);
    setHasVoted(true);
    
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectSlug: project.slug }),
      });
      
      if (!res.ok) {
        // Revert optimistic update on error
        setVoteCount((prev) => prev - 1);
        setHasVoted(false);
        console.error('Failed to vote:', await res.text());
      }
    } catch (error) {
      // Revert optimistic update on error
      setVoteCount((prev) => prev - 1);
      setHasVoted(false);
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="bg-foreground/5 rounded-lg border border-foreground/10 overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <div className="p-6 flex-grow">
        <h3 className="font-bold text-xl mb-2">
          <Link 
            href={`/projects/${project.slug}`}
            className="hover:text-primary transition-colors"
          >
            {project.title}
          </Link>
        </h3>
        
        <p className="text-foreground/70 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-block px-2 py-1 text-xs bg-foreground/10 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div>
          <p className="text-sm text-foreground/60">
            Team: {project.teamMembers.join(', ')}
          </p>
        </div>
      </div>
      
      <div className="border-t border-foreground/10 p-4 flex items-center justify-between">
        <Link 
          href={`/projects/${project.slug}`}
          className="text-sm text-primary hover:underline"
        >
          View details
        </Link>
        
        <button
          onClick={handleVote}
          disabled={hasVoted || isVoting}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm transition-colors ${
            hasVoted 
              ? 'bg-primary/20 text-primary cursor-default' 
              : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/80'
          }`}
        >
          <span>
            {hasVoted ? 'Voted' : 'Vote'}
          </span>
          <span className="font-bold">{voteCount}</span>
        </button>
      </div>
    </div>
  );
};
