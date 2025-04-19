'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVotes } from '@/lib/actions/votes';
import { VoteResponse } from '@/app/types';
import Skeleton from './components/Skeleton';
import VoteCard from '@/app/components/VoteCard';
import SeedButton from './components/SeedButton';

export default function HomePage() {
  const [votes, setVotes] = useState<VoteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setIsLoading(true);
        const data = await getVotes();
        setVotes(data);
      } catch (err) {
        console.error('Error fetching votes:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch votes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotes();
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
            <Link
              href="/votes/create"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              투표 만들기
            </Link>
            <SeedButton />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <Skeleton variant="image" className="mb-4" />
                <Skeleton variant="text" className="mb-4" />
                <Skeleton variant="text" className="w-1/2 mb-4" />
                <div className="flex justify-end mt-4">
                  <Skeleton variant="text" />
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
