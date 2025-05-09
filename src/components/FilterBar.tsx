"use client";

import { useState } from 'react';

interface FilterBarProps {
  technologies: string[];
  onFilterChange: (selectedTechs: string[]) => void;
}

/**
 * Filter bar component for filtering projects by technology
 */
export const FilterBar = ({ technologies, onFilterChange }: FilterBarProps) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const toggleTechnology = (tech: string) => {
    const isSelected = selectedTechnologies.includes(tech);
    let newSelection: string[];
    
    if (isSelected) {
      newSelection = selectedTechnologies.filter(t => t !== tech);
    } else {
      newSelection = [...selectedTechnologies, tech];
    }
    
    setSelectedTechnologies(newSelection);
    onFilterChange(newSelection);
  };

  const clearFilters = () => {
    setSelectedTechnologies([]);
    onFilterChange([]);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-foreground/70">Filter by technology</h2>
        
        {selectedTechnologies.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => toggleTechnology(tech)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTechnologies.includes(tech)
                ? 'bg-primary text-white'
                : 'bg-foreground/10 hover:bg-foreground/20 text-foreground/70'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
};
