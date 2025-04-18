'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/s3';

type VoteItem = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type Vote = {
  id: number;
  title: string;
  type: string;
  image: string;
  startDate: string;
  endDate: string;
  voteItemVote: {
    id: number;
    voteCount: number;
    voteItem: VoteItem;
  }[];
};

function SkeletonVoteCard() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="relative h-48 bg-gray-200 animate-pulse rounded-t-xl" />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-200 h-6 w-12 rounded animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
        <div className="mt-4 flex justify-end">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch('/api/votes');
        if (!response.ok) throw new Error('Failed to fetch votes');
        const data = await response.json();
        setVotes(data);
      } catch (error) {
        console.error('Error fetching votes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotes();
  }, []);

  const calculateDday = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">투표 목록</h1>
          <div className="flex space-x-4">
            <Link
              href="/vote-items"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              항목 관리
            </Link>
            <Link
              href="/votes/create"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              투표 만들기
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <SkeletonVoteCard />
              <SkeletonVoteCard />
              <SkeletonVoteCard />
              <SkeletonVoteCard />
            </>
          ) : (
            votes.map((vote) => (
              <Link
                key={vote.id}
                href={`/votes/${vote.id}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
              > 
                <div className="relative h-48">
                  <Image
                    src={getPublicUrl(vote.image)}
                    alt={vote.title}
                    fill
                    className="object-cover rounded-t-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-100 text-red-500 text-sm px-2 py-1 rounded">
                      D-{calculateDday(vote.endDate)}
                    </span>
                    <h2 className="text-lg font-semibold">{vote.title}</h2>
                  </div>
                  <p className="text-gray-600">{vote.title}</p>
                  <div className="mt-4 flex justify-end text-sm text-gray-500">
                    <span>투표 기간: {new Date(vote.startDate).toLocaleDateString()} ({new Date(vote.startDate).toLocaleDateString('ko-KR', { weekday: 'short' })}) - {new Date(vote.endDate).toLocaleDateString()} ({new Date(vote.endDate).toLocaleDateString('ko-KR', { weekday: 'short' })})</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
