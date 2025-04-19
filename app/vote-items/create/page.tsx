'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VoteItemForm from '@/app/components/VoteItemForm';
import { createVoteItem } from '@/lib/actions/vote-items';

export default function CreateVoteItemPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      await createVoteItem(formData);
      router.push('/vote-items');
    } catch (err) {
      setError(err instanceof Error ? err.message : '투표 항목 생성에 실패했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">투표 항목 생성</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <VoteItemForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
} 