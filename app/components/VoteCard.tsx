'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';
import VoteRemoveModal from './VoteRemoveModal';
import { VoteResponse } from '@/app/types';
import { getPublicUrl } from '@/lib/s3';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface VoteCardProps {
  vote: VoteResponse;
}

function calculateDday(endDate: Date) {
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function VoteCard({ vote }: VoteCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();
  const session = useSession();

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDeleteConfirm(true);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
      <Link
        href={`/votes/${vote.id}`}
        className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
      >
        <div className="relative h-96">
          <Image
            src={getPublicUrl(vote.image)}
            alt={vote.title}
            fill
            className="object-cover rounded-t-xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {session?.status === 'authenticated' && (
            <button
              onClick={handleRemoveClick}
              className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-gray-900 transition-colors hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
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
            <span>
              투표 기간: {new Date(vote.startDate).toLocaleDateString()} (
              {new Date(vote.startDate).toLocaleDateString('ko-KR', { weekday: 'short' })}) -{' '}
              {new Date(vote.endDate).toLocaleDateString()} (
              {new Date(vote.endDate).toLocaleDateString('ko-KR', { weekday: 'short' })})
            </span>
          </div>
        </div>
      </Link>

      {showDeleteConfirm && (
        <VoteRemoveModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          voteId={vote.id}
          voteTitle={vote.title}
        />
      )}
    </div>
  );
} 