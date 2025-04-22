'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVotes } from '@/lib/actions/votes';
import { VoteResponse } from '@/app/types';
import Skeleton from '../components/Skeleton';
import VoteCard from '@/app/components/VoteCard';
import { useSession } from 'next-auth/react';
import SeedButton from '../components/SeedButton';

export default function VotesPage() {
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

  const now = new Date();
  const activeVotes = votes.filter(vote => {
    const startDate = new Date(vote.startDate);
    const endDate = new Date(vote.endDate);
    return now >= startDate && now <= endDate;
  });

  const completedVotes = votes.filter(vote => {
    const endDate = new Date(vote.endDate);
    return now > endDate;
  });

  const upcomingVotes = votes.filter(vote => {
    const startDate = new Date(vote.startDate);
    return now < startDate;
  });

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
          <h1 className="text-3xl font-bold text-gray-900">투표 목록</h1>
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

        {/* 진행 중인 투표 */}
        {isLoading ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">진행중인 투표</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden h-96">
                  <div className="relative h-64">
                    <div className="relative h-full overflow-hidden">
                      <Skeleton variant="image" className="h-full w-full" />
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
          </div>
        ) : activeVotes.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">진행중인 투표</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {activeVotes.map((vote) => (
                <VoteCard key={vote.id} vote={vote} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">진행중인 투표</h2>
            <div className="text-center py-8">
              <p className="text-gray-500">진행중인 투표가 없습니다.</p>
            </div>
          </div>
        )}

        {/* 예정된 투표 */}
        {isLoading ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">예정된 투표</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden h-96">
                  <div className="relative h-64">
                    <div className="relative h-full overflow-hidden">
                      <Skeleton variant="image" className="h-full w-full" />
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
          </div>
        ) : upcomingVotes.length > 0 ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">예정된 투표</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingVotes.map((vote) => (
                <VoteCard key={vote.id} vote={vote} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">예정된 투표</h2>
            <div className="text-center">
              <p className="text-gray-500">예정된 투표가 없습니다.</p>
            </div>
          </div>
        )}

        {/* 완료된 투표 */}
        {isLoading ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">완료된 투표</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden h-96">
                  <div className="relative h-64">
                    <div className="relative h-full overflow-hidden">
                      <Skeleton variant="image" className="h-full w-full" />
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
          </div>
        ) : completedVotes.length > 0 ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">완료된 투표</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedVotes.map((vote) => (
                <VoteCard key={vote.id} vote={vote} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">완료된 투표</h2>
            <div className="text-center">
              <p className="text-gray-500">완료된 투표가 없습니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 