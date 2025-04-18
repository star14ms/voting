import { useState } from 'react';

interface VoteButtonProps {
  itemId: number;
  voteId: number;
}

export default function VoteButton({ itemId, voteId }: VoteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/votes/${itemId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteId }),
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
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isLoading}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {isLoading ? 'Voting...' : 'Vote'}
    </button>
  );
} 