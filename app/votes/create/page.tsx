'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getVoteItems } from '@/lib/actions/vote-items';
import { VoteItem } from '@/app/types';
import Skeleton from '@/app/components/Skeleton';
import CreateVoteForm from './CreateVoteForm';

export default function CreateVotePage() {
  const router = useRouter();
  const [voteItems, setVoteItems] = useState<VoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoteItems = async () => {
      try {
        setIsLoading(true);
        const items = await getVoteItems();
        setVoteItems(items.map(item => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString()
        })));
      } catch (err) {
        console.error('Error fetching vote items:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch vote items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoteItems();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← 홈으로 돌아가기
            </Link>
          </div>
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
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← 홈으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">새 투표 만들기</h1>

          {isLoading ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton variant="text" className="w-1/4" />
                <Skeleton variant="default" />
              </div>
              <div className="space-y-4">
                <Skeleton variant="text" className="w-1/4" />
                <Skeleton variant="default" />
              </div>
              <div className="space-y-4">
                <Skeleton variant="text" className="w-1/4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <Skeleton variant="image" className="mb-4" />
                      <Skeleton variant="text" className="mb-2" />
                      <Skeleton variant="text" className="w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <CreateVoteForm initialVoteItems={voteItems} />
          )}
        </div>
      </div>
    </div>
  );
} 