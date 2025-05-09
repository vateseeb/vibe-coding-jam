"use client";

import { useState } from 'react';

interface VoteButtonProps {
  projectSlug: string;
  initialVotes: number;
}

export const VoteButton = ({ projectSlug, initialVotes }: VoteButtonProps) => {
  const [voteCount, setVoteCount] = useState(initialVotes);
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
        body: JSON.stringify({ projectSlug }),
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
    <button
      onClick={handleVote}
      disabled={hasVoted || isVoting}
      className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
        hasVoted 
          ? 'bg-primary/20 text-primary cursor-default' 
          : 'bg-primary text-white hover:bg-primary-dark'
      }`}
    >
      {hasVoted ? (
        <>
          <span>Voted</span>
          <HeartIcon filled />
        </>
      ) : (
        <>
          <span>Vote for this project</span>
          <HeartIcon filled={false} />
        </>
      )}
      <span className="font-bold">{voteCount}</span>
    </button>
  );
};

const HeartIcon = ({ filled }: { filled: boolean }) => {
  return filled ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 4.248C8.852-1.154 0 .423 0 7.192 0 11.853 5.571 16.619 12 23c6.43-6.381 12-11.147 12-15.808 0-6.79-8.852-8.325-12-2.944z"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4.248C8.852-1.154 0 .423 0 7.192 0 11.853 5.571 16.619 12 23c6.43-6.381 12-11.147 12-15.808 0-6.79-8.852-8.325-12-2.944z"/>
    </svg>
  );
};
