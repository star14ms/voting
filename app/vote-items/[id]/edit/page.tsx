'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VoteItemForm from '@/app/components/VoteItemForm';
import { getVoteItem, updateVoteItem } from '@/lib/actions/vote-items';
import { VoteItem } from '@prisma/client';
import { getPublicUrl } from '@/lib/s3';

export default function EditVoteItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<VoteItem | null>(null);

  useEffect(() => {
    const fetchVoteItem = async () => {
      try {
        const data = await getVoteItem(Number(params.id));
        setInitialData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '투표 항목을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoteItem();
  }, [params.id]);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      await updateVoteItem(Number(params.id), formData);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : '투표 항목 수정에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">투표 항목 수정</h1>
          </div>
          <div className="bg-white rounded-xl p-6 shadow animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">투표 항목 수정</h1>
          </div>
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">투표 항목 수정</h1>
          </div>
          <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
            투표 항목을 찾을 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">투표 항목 수정</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <VoteItemForm 
          onSubmit={handleSubmit} 
          initialData={{
            name: initialData.name,
            description: initialData.description,
            image: initialData.image
          }}
        />
      </div>
    </div>
  );
} 