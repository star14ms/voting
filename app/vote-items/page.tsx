'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/s3';

type VoteItem = {
  id: number;
  name: string;
  description: string;
  image: string;
};

function SkeletonItem() {
  return (
    <div className="border rounded-lg p-4">
      <div className="relative h-48 mb-4 bg-gray-200 animate-pulse rounded-lg" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse" />
      <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
    </div>
  );
}

export default function VoteItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<VoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/vote-items');
      if (response.ok) {
        const data = await response.json();
        setItems(data);

        // Pre-fetch image URLs
        const urls: Record<string, string> = {};
        for (const item of data) {
          urls[item.image] = getPublicUrl(item.image);
        }
        setImageUrls(urls);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to load vote items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('이 항목을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/vote-items?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.votes) {
          alert(`다음 투표에서 사용 중인 항목은 삭제할 수 없습니다:\n${data.votes.join('\n')}`);
        } else {
          throw new Error('투표 항목 삭제에 실패했습니다');
        }
        return;
      }

      // Refresh the list
      fetchItems();
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
          {loading ? (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow p-4">
                <div className="relative h-48 mb-4">
                  <Image
                    src={imageUrls[item.image] || getPublicUrl(item.image)}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
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
            ))
          )}
        </div>
      </div>
    </main>
  );
} 