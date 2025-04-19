'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/s3';
import { VoteItem } from '@/app/types';
import { deleteVoteItem } from '@/lib/actions/vote-items';

type VoteItemsClientProps = {
  initialItems: VoteItem[];
};

export default function VoteItemsClient({ initialItems }: VoteItemsClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<VoteItem[]>(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  // Pre-fetch image URLs
  useState(() => {
    const urls: Record<string, string> = {};
    for (const item of initialItems) {
      urls[item.image] = getPublicUrl(item.image);
    }
    setImageUrls(urls);
  });

  const handleDelete = async (id: number) => {
    if (!confirm('이 항목을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const result = await deleteVoteItem(id);
      
      if (result.error === '사용 중인 항목') {
        alert(`다음 투표에서 사용 중인 항목은 삭제할 수 없습니다:\n${result.votes.join('\n')}`);
        return;
      }

      // Update local state immediately
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      
      // Also refresh the page data
      router.refresh();
    } catch (err) {
      setError('투표 항목 삭제에 실패했습니다');
      console.error('투표 항목 삭제 중 오류:', err);
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">투표 항목 관리</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            투표 목록으로 돌아가기
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4">
              <div className="relative h-48 mb-4">
                <Image
                  src={imageUrls[item.image] || getPublicUrl(item.image)}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 