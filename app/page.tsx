'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVotes } from '@/lib/actions/votes';
import { VoteResponse } from '@/app/types';
import Skeleton from './components/Skeleton';
import VoteCard from '@/app/components/VoteCard';
import SeedButton from './components/SeedButton';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const [votes, setVotes] = useState<VoteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const session = useSession();

  const fetchVotes = async () => {
    try {
      const data = await getVotes();
      setVotes(data);
    } catch (err) {
      console.error('Error fetching votes:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch votes');
    }
  };

  // Initial load
  useEffect(() => {
    fetchVotes().finally(() => setIsLoading(false));
  }, []);

  // Add event listener for custom events
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
          <h1 className="text-2xl font-bold text-gray-900">진행중인 투표</h1>
          <div className="flex space-x-4">
            {session?.status === 'authenticated' && (
              <>
              <Link
                href="/votes/create"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                투표 만들기
              </Link>
              <SeedButton />
              </>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <div className="relative h-full overflow-hidden">
                    <Skeleton variant="image" className="h-full w-full" />
                  </div>
                  <div className="absolute right-2 top-2">
                    <Skeleton variant="button" className="w-10 h-10 rounded-full" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton variant="text" className="h-6 w-12" />
                    <Skeleton variant="text" className="h-6 w-3/4" />
                  </div>
                  <Skeleton variant="text" className="h-4 w-full mb-4" />
                  <div className="flex justify-end">
                    <Skeleton variant="text" className="h-4 w-48" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {votes.map((vote) => (
              <VoteCard key={vote.id} vote={vote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
