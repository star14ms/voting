'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getVoteItems } from '@/lib/actions/vote-items';
import { VoteItem, SimpleVoteItem, VoteResponse } from '@/app/types';
import { uploadFile, updateVote, getVote } from '@/lib/actions/votes';
import { getPublicUrl } from '@/lib/s3';
import SelectVoteItemModal from '@/app/components/SelectVoteItemModal';
import { useSession } from 'next-auth/react';

type ExistingVoteItem = SimpleVoteItem;

export default function EditVotePage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [voteItems, setVoteItems] = useState<VoteItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<string>('CELEBRITY');
  const [voteImagePreview, setVoteImagePreview] = useState<string>('');
  const [existingVoteItems, setExistingVoteItems] = useState<ExistingVoteItem[]>([]);
  const [modifiedItems, setModifiedItems] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vote, items] = await Promise.all([
          getVote(params.id),
          getVoteItems()
        ]);

        setTitle(vote.title);
        setType(vote.type);
        setVoteImagePreview(vote.image);
        setStartDate(new Date(vote.startDate).toISOString().split('T')[0]);
        setEndDate(new Date(vote.endDate).toISOString().split('T')[0]);
        
        setExistingVoteItems(vote.voteItemVote.map(item => ({
          id: item.voteItem.id,
          name: item.voteItem.name,
          description: item.voteItem.description,
          image: item.voteItem.image
        })));

        setVoteItems(items.map(item => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString()
        })));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSelectExistingItem = (item: ExistingVoteItem) => {
    if (selectedItemIndex !== null) {
      const isAlreadySelected = existingVoteItems.some(
        (existingItem, index) => 
          existingItem.id === item.id && index !== selectedItemIndex
      );

      if (isAlreadySelected) {
        alert('이미 선택된 항목입니다.');
        return;
      }

      const newItems = [...existingVoteItems];
      newItems[selectedItemIndex] = {
        ...newItems[selectedItemIndex],
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image
      };
      setExistingVoteItems(newItems);
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = (index: number) => {
    setSelectedItemIndex(index);
    setIsModalOpen(true);
  };

  const handleVoteImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const { url } = await uploadFile(formData);
        setVoteImagePreview(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleItemImageChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const { url } = await uploadFile(formData);
        const newItems = [...existingVoteItems];
        newItems[index] = { ...newItems[index], image: url };
        setExistingVoteItems(newItems);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleAddItem = () => {
    setExistingVoteItems([...existingVoteItems, { id: 0, name: '', description: '', image: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    if (existingVoteItems.length > 2) {
      const newItems = existingVoteItems.filter((_, i) => i !== index);
      setExistingVoteItems(newItems);
    } else {
      alert('투표 항목은 최소 2개 이상이어야 합니다.');
    }
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === existingVoteItems.length - 1)
    ) {
      return;
    }

    const newItems = [...existingVoteItems];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setExistingVoteItems(newItems);
  };

  const handleItemChange = (index: number, field: keyof SimpleVoteItem, value: string | File) => {
    const newItems = [...existingVoteItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setExistingVoteItems(newItems);
    
    if (newItems[index].id !== 0) {
      setModifiedItems(prev => new Set(prev).add(newItems[index].id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('image', voteImagePreview);

      const unmodifiedExistingItems = existingVoteItems
        .filter(item => item.id !== 0 && !modifiedItems.has(item.id))
        .map(item => item.id);

      if (unmodifiedExistingItems.length > 0) {
        formData.append('existingItems', JSON.stringify(unmodifiedExistingItems));
      }

      const newItems = existingVoteItems
        .filter(item => item.id === 0 || modifiedItems.has(item.id))
        .map(item => ({
          name: item.name,
          description: item.description,
          image: item.image,
          id: item.id === 0 ? undefined : item.id
        }));

      if (newItems.length > 0) {
        formData.append('newItems', JSON.stringify(newItems));
      }

      await updateVote(params.id, formData);
      router.push(`/votes/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating vote:', error);
      setError(error instanceof Error ? error.message : '투표 수정에 실패했습니다');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/votes/${params.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            뒤로가기
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">투표 수정하기</h1>
          <div className="w-24" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vote Details */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  투표 제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  소개 이미지
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleVoteImageChange}
                  className="w-full px-3 py-2 border rounded-md text-gray-900"
                />
                {voteImagePreview && (
                  <div className="mt-2">
                    <div className="relative h-96 w-full">
                      <Image
                        src={getPublicUrl(voteImagePreview)}
                        alt="Vote Preview"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  투표 유형
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-gray-900"
                >
                  <option value="CELEBRITY">연예인</option>
                  <option value="TVSHOW">TV 프로그램</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    시작일
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    종료일
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vote Items */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">투표 항목</h2>
                <span className="text-sm text-gray-500">최소 2개 이상의 항목이 필요합니다</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {existingVoteItems.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <button
                            type="button"
                            onClick={() => handleMoveItem(index, 'up')}
                            disabled={index === 0}
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveItem(index, 'down')}
                            disabled={index === existingVoteItems.length - 1}
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                      {existingVoteItems.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          X
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이름
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        이미지
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleItemImageChange(e, index)}
                        className="w-full px-3 py-2 border rounded-md text-gray-900"
                      />
                      {item.image && (
                        <div className="mt-2">
                          <div className="relative h-48 w-full">
                            <Image
                              src={getPublicUrl(item.image)}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(index)}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                      >
                        기존 항목에서 선택
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              + 항목 추가
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <SelectVoteItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelectExistingItem}
          items={voteItems}
        />
      )}
    </main>
  );
} 