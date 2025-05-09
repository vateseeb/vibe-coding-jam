"use client";

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

/**
 * Search component for filtering projects
 */
export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex w-full max-w-md mb-6 mx-auto"
    >
      <div className="relative flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full px-4 py-2 rounded-l-lg border border-r-0 border-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-foreground/5"
        />
        {query && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground/80"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors"
      >
        Search
      </button>
    </form>
  );
};
