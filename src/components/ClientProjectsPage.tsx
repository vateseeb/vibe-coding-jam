"use client";

import { FilterBar } from "@/components/FilterBar";
import { ProjectCard } from "@/components/ProjectCard";
import { SearchBar } from "@/components/SearchBar";
import { ProjectSummary } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

interface ClientProjectsPageProps {
  initialProjects: ProjectSummary[];
}

export default function ClientProjectsPage({ initialProjects }: ClientProjectsPageProps) {
  const [filteredProjects, setFilteredProjects] = useState<ProjectSummary[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  
  // Extract unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(initialProjects.flatMap(project => project.technologies))
  ).sort();

  // Filter projects based on search query and selected technologies
  const filterProjects = useCallback(() => {
    let results = initialProjects;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        project =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.teamMembers.some(member => member.toLowerCase().includes(query))
      );
    }
    
    // Filter by technologies
    if (selectedTechnologies.length > 0) {
      results = results.filter(project =>
        selectedTechnologies.some(tech => project.technologies.includes(tech))
      );
    }
    
    setFilteredProjects(results);
  }, [initialProjects, searchQuery, selectedTechnologies]);

  // Update filtered projects when search or filters change
  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  return (
    <div className="space-y-6">
      <SearchBar onSearch={setSearchQuery} />
      
      <FilterBar 
        technologies={allTechnologies}
        onFilterChange={setSelectedTechnologies}
      />
      
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-foreground/50">
            No projects match your criteria. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
