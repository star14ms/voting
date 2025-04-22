'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/s3';

type VoteItemFormProps = {
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: {
    name: string;
    description?: string;
    image?: string;
  };
};

export default function VoteItemForm({ onSubmit, initialData }: VoteItemFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Error creating vote item:', err);
      setError(err instanceof Error ? err.message : '투표 항목 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={initialData?.name}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명 <span className="text-gray-500 text-sm">(선택사항)</span>
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={initialData?.description}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
              placeholder="설명을 입력하세요 (선택사항)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이미지
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required={!initialData?.image}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
            {imagePreview && (
              <div className="mt-2">
                <div className="relative h-48 w-full">
                  <Image
                    src={getPublicUrl(imagePreview)}
                    alt="Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <Link
          href="/vote-items"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          취소
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
} 