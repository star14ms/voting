'use client';

import { useEffect, useState } from 'react';
import { getVotes } from '@/lib/actions/votes';
import { VoteResponse } from '@/app/types';
import Skeleton from './components/Skeleton';
import VoteCard from '@/app/components/VoteCard';

export default function HomePage() {
  const [votes, setVotes] = useState<VoteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVotes = async () => {
    try {
      const data = await getVotes();
      // Sort by vote count and take top 3
      const sortedVotes = [...data].sort((a, b) => b.voteItemVote.reduce((sum, item) => sum + item.voteCount, 0) - a.voteItemVote.reduce((sum, item) => sum + item.voteCount, 0)).slice(0, 3);
      setVotes(sortedVotes);
    } catch (err) {
      console.error('Error fetching votes:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch votes');
    }
  };

  useEffect(() => {
    fetchVotes().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const handleVoteChange = () => {
      fetchVotes();
    };

    window.addEventListener('voteCreated', handleVoteChange);
    window.addEventListener('voteDeleted', handleVoteChange);

    return () => {
      window.removeEventListener('voteCreated', handleVoteChange);
      window.removeEventListener('voteDeleted', handleVoteChange);
    };
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-red-500 mb-4">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">인기 투표</h1>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-96">
                  <div className="relative h-full overflow-hidden">
                    <Skeleton variant="image" className="h-full w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : votes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center">아직 생성된 투표가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {votes.map((vote) => (
              <VoteCard key={vote.id} vote={vote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
