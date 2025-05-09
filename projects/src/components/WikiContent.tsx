"use client";

import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

interface WikiContentProps {
  projectSlug: string;
}

/**
 * Component for rendering sanitized markdown content from the Wiki
 */
export const WikiContent = ({ projectSlug }: WikiContentProps) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWikiContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/wiki/${projectSlug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch wiki content');
        }
        
        const data = await response.json();
        
        if (data.content) {
          // Parse markdown and sanitize HTML
          const parsedContent = marked.parse(data.content);
          const sanitizedContent = DOMPurify.sanitize(parsedContent);
          setContent(sanitizedContent);
        } else {
          setContent('<p>No wiki content available for this project.</p>');
        }
      } catch (err) {
        console.error('Error fetching wiki content:', err);
        setError('Failed to load wiki content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWikiContent();
  }, [projectSlug]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-foreground/10 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-foreground/10 rounded mb-4"></div>
        <div className="h-4 bg-foreground/10 rounded mb-4 w-5/6"></div>
        <div className="h-4 bg-foreground/10 rounded mb-4 w-2/3"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div 
      className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:text-foreground prose-a:text-primary"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
