'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/s3';
import { VoteItem } from '@/app/types';
import { deleteVoteItem, getVoteItems } from '@/lib/actions/vote-items';
import { deleteUnusedVoteItems } from '@/lib/actions/votes';
import ConfirmModal from '@/components/ConfirmModal';
import { TrashIcon } from '@heroicons/react/24/outline';

interface VoteItemsClientProps {
  initialItems: {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
  }[];
}

export default function VoteItemsClient({ initialItems }: VoteItemsClientProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VoteItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [showDeleteUnusedModal, setShowDeleteUnusedModal] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Pre-fetch image URLs
  useEffect(() => {
    const urls: Record<string, string> = {};
    for (const item of initialItems) {
      if (item.image) {
        urls[item.image] = getPublicUrl(item.image);
      }
    }
    setImageUrls(urls);
  }, [initialItems]);

  const handleDeleteClick = (item: VoteItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedItem) {
      await deleteVoteItem(selectedItem.id);
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  const handleDeleteUnused = async () => {
    try {
      setIsDeleting(-1);
      setMessage(null);
      const result = await deleteUnusedVoteItems();
      setMessage(result.message);
      const updatedItems = await getVoteItems();
      setItems(updatedItems);
    } catch (error) {
      setMessage('미사용 항목 삭제에 실패했습니다');
    } finally {
      setIsDeleting(null);
      setShowDeleteUnusedModal(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(id);
      await deleteVoteItem(id);
      setItems(items.filter(item => item.id !== id));
      router.refresh();
    } catch (error) {
      console.error('Error deleting vote item:', error);
    } finally {
      setIsDeleting(null);
      setShowDeleteModal(null);
    }
  };

  // Update local state when initialItems changes
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">투표 항목 관리</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              투표 목록으로 돌아가기
            </Link>
            <button
              type="button"
              onClick={() => setShowDeleteUnusedModal(true)}
              disabled={isDeleting === -1}
              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {isDeleting === -1 ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <TrashIcon className="h-5 w-5" />
              )}
              <span>{isDeleting === -1 ? '삭제 중...' : '미사용 항목 모두 삭제'}</span>
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.includes('실패') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
            >
              <div className="h-48 w-full overflow-hidden rounded-t-lg bg-gray-200">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(item.id)}
                  className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-gray-900 transition-colors hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  disabled={isDeleting === item.id}
                >
                  {isDeleting === item.id ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" />
                  ) : (
                    <TrashIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                )}
              </div>

              <ConfirmModal
                isOpen={showDeleteModal === item.id}
                onClose={() => setShowDeleteModal(null)}
                onConfirm={() => handleDelete(item.id)}
                title="투표 항목 삭제"
                message={`"${item.name}" 항목을 삭제하시겠습니까?`}
                confirmText="삭제"
                isDestructive={true}
              />
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteUnusedModal}
        onClose={() => setShowDeleteUnusedModal(false)}
        onConfirm={handleDeleteUnused}
        title="미사용 항목 삭제"
        message="사용되지 않는 모든 투표 항목을 삭제하시겠습니까?"
        confirmText="삭제"
        isDestructive={true}
      />
    </main>
  );
} 