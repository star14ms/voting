'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VoteItem } from '@prisma/client';
import { deleteVoteItem, getVoteItems } from '@/lib/actions/vote-items';
import { deleteUnusedVoteItems } from '@/lib/actions/votes';
import Image from 'next/image';
import Skeleton from '../components/Skeleton';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/s3';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type VoteItemWithStringDates = Omit<VoteItem, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
  voteItemVote: { id: number }[];
};

export default function VoteItemsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [voteItems, setVoteItems] = useState<VoteItemWithStringDates[]>([]);
  const [isDeletingUnused, setIsDeletingUnused] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteResult, setDeleteResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);
  const session = useSession();

  useEffect(() => {
    loadVoteItems();
  }, [router]);

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

  const handleDeleteUnused = async () => {
    try {
      setIsDeletingUnused(true);
      const result = await deleteUnusedVoteItems();
      setDeleteResult({ success: true, message: result.message });
      loadVoteItems();
    } catch (err) {
      console.error('Error deleting unused items:', err);
      setDeleteResult({ success: false, error: err instanceof Error ? err.message : 'Failed to delete unused items' });
    } finally {
      setIsDeletingUnused(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">투표 항목 관리</h1>
          {session.data && (
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-100 hover:bg-red-200 text-red-900 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isDeletingUnused}
              >
                {isDeletingUnused ? '삭제 중...' : '미사용 항목 모두 삭제'}
              </button>
              <Link
                href="/vote-items/create"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                항목 추가
              </Link>
            </div>
          )}
        </div>

        <Dialog
          open={showDeleteConfirm}
          onClose={() => !isDeletingUnused && setShowDeleteConfirm(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeletingUnused}
                >
                  <span className="sr-only">닫기</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                미사용 항목 모두 삭제
              </Dialog.Title>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  현재 사용되지 않는 모든 투표 항목을 삭제하시겠습니까?
                </p>
                <p className="text-sm text-red-500 mt-2">
                  이 작업은 되돌릴 수 없습니다.
                </p>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeletingUnused}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleDeleteUnused}
                  disabled={isDeletingUnused}
                >
                  {isDeletingUnused ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {deleteResult && (
          <div className={`mb-4 p-4 rounded-lg ${
            deleteResult.success ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
          }`}>
            {deleteResult.success 
              ? deleteResult.message
              : deleteResult.error || '삭제 중 오류가 발생했습니다.'}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex">
                  <div className="w-[150px] h-[200px] relative flex-shrink-0">
                    <div className="relative h-full overflow-hidden">
                      <Skeleton variant="image" className="h-full w-full" />
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <Skeleton variant="text" className="h-6 w-3/4 mb-2" />
                      <Skeleton variant="text" className="h-4 w-full" />
                    </div>
                    <div className="flex justify-end">
                      <Skeleton variant="button" className="w-16 h-8" />
                    </div>
                  </div>
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
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex">
                  <div className="w-[150px] h-[200px] relative">
                    <Image
                      src={getPublicUrl(item.image)}
                      alt={item.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      {session.data && (
                        <>
                          <Link
                            href={`/vote-items/${item.id}/edit`}
                            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                            title="수정"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </Link>
                          {item.voteItemVote.length === 0 && (
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                              title="삭제"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          )}
                        </>
                      )}
                    </div>
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