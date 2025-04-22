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
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden group">
      <Link
        href={`/votes/${vote.id}`}
        className="block bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="relative h-96 overflow-hidden">
          <Image
            src={getPublicUrl(vote.image)}
            alt={vote.title}
            fill
            className="object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 group-hover:translate-y-[-10px] transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-2">{vote.title}</h3>
            <p className="text-sm text-white/80">
              투표 기간: {vote.startDate.toLocaleDateString()} - {vote.endDate.toLocaleDateString()}
            </p>
          </div>
          {session?.status === 'authenticated' && (
            <div className="absolute right-2 top-2 flex space-x-2">
              <Link
                href={`/votes/${vote.id}/edit`}
                className="rounded-full bg-white/80 p-2 text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </Link>
              <button
                onClick={handleRemoveClick}
                className="rounded-full bg-white/80 p-2 text-gray-900 transition-colors hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          )}
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