import React, { useState } from 'react';

interface VoteButtonProps {
  itemId: number;
  voteId: number;
}

export default function VoteButton({ itemId, voteId }: VoteButtonProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    try {
      setIsVoting(true);
      const response = await fetch(`/api/votes/${itemId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteId })
      });

      if (!response.ok) {
        throw new Error('Failed to vote');
      }

      // Refresh the page to show updated vote count
      window.location.reload();
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isVoting}
      className={`px-4 py-2 rounded ${
        isVoting
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
    >
      {isVoting ? 'Voting...' : 'Vote'}
    </button>
  );
} 