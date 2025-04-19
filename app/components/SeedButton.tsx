'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { seedDatabase } from '@/lib/actions/seed';
import { useRouter } from 'next/navigation';

type SampleSet = 'cooking' | 'tvshows';

const sampleSetLabels: Record<SampleSet, string> = {
  cooking: '요리 프로그램 인기 투표',
  tvshows: 'TV 프로그램 인기투표'
};

export default function SeedButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState<SampleSet>('cooking');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSeed = async () => {
    setIsLoading(true);
    try {
      const result = await seedDatabase(selectedSet);
      if (result.success) {
        router.refresh();
        // Dispatch custom event for vote creation
        window.dispatchEvent(new Event('voteCreated'));
      } else {
        console.error('Failed to seed database:', result.error);
      }
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        샘플 데이터 추가
      </button>

      <Dialog
        open={isOpen}
        onClose={() => !isLoading && setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              샘플 데이터 선택
            </Dialog.Title>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                추가할 샘플 데이터를 선택해주세요.
              </p>

              <div className="mt-4 space-y-4">
                {Object.entries(sampleSetLabels).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sampleSet"
                      value={key}
                      checked={selectedSet === key}
                      onChange={() => setSelectedSet(key as SampleSet)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                취소
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSeed}
                disabled={isLoading}
              >
                {isLoading ? '추가 중...' : '추가하기'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
} 