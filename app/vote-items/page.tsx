'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VoteItem } from '@prisma/client';
import { deleteVoteItem, getVoteItems } from '@/lib/actions/vote-items';
import Image from 'next/image';
import Skeleton from '../components/Skeleton';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/s3';

type VoteItemWithStringDates = Omit<VoteItem, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export default function VoteItemsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [voteItems, setVoteItems] = useState<VoteItemWithStringDates[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      loadVoteItems();
    }
  }, [status, router]);

  const loadVoteItems = async () => {
    try {
      const items = await getVoteItems();
      setVoteItems(items.map(item => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString()
      })));
    } catch (err) {
      console.error('Error loading vote items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVoteItem(id);
      setVoteItems(voteItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting vote item:', err);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">투표 항목 관리</h1>
          <Link
            href="/vote-items/create"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            항목 추가
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <Skeleton variant="image" className="h-48 mb-4" />
                <Skeleton variant="text" className="mb-2" />
                <Skeleton variant="text" className="w-3/4" />
                <div className="flex justify-end mt-4">
                  <Skeleton variant="button" />
                </div>
              </div>
            ))}
          </div>
        ) : voteItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-center">아직 생성된 투표 항목이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voteItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow">
                <div className="relative h-48">
                  <Image
                    src={getPublicUrl(item.image)}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 