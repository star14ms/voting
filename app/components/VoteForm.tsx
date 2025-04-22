'use client';

import { useState, useEffect } from 'react';
import { VoteResponse } from '@/app/types';
import { uploadFile } from '@/lib/actions/votes';
import { getPublicUrl } from '@/lib/s3';
import Image from 'next/image';

interface VoteFormProps {
  initialData?: VoteResponse;
  onSubmit: (formData: FormData) => Promise<void>;
  submitText: string;
}

export default function VoteForm({ initialData, onSubmit, submitText }: VoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [type, setType] = useState<string>(() => initialData?.type || 'CELEBRITY');
  const [startDate, setStartDate] = useState(initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '');
  const [endDate, setEndDate] = useState(initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '');
  const [image, setImage] = useState(initialData?.image || '');
  const [imagePreview, setImagePreview] = useState(initialData?.image ? getPublicUrl(initialData.image) : '');
  const [items, setItems] = useState<Array<{
    id?: number;
    name: string;
    description: string;
    image: string;
    imagePreview?: string;
  }>>(initialData?.voteItemVote?.map(item => ({
    id: item.voteItem.id,
    name: item.voteItem.name,
    description: item.voteItem.description,
    image: item.voteItem.image,
    imagePreview: getPublicUrl(item.voteItem.image),
  })) || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadFile(formData);
      setImage(url);
      setImagePreview(getPublicUrl(url));
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('이미지 업로드에 실패했습니다');
    }
  };

  const handleItemImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadFile(formData);
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        image: url,
        imagePreview: getPublicUrl(url),
      };
      setItems(newItems);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('이미지 업로드에 실패했습니다');
    }
  };

  const addItem = () => {
    setItems([...items, { name: '', description: '', image: '' }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateItem = (index: number, field: 'name' | 'description', value: string) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('type', type);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('image', image);

      const existingItems = items.filter(item => item.id);
      const newItems = items.filter(item => !item.id);

      formData.append('existingItems', JSON.stringify(existingItems.map(item => item.id)));
      formData.append('newItems', JSON.stringify(newItems));

      await onSubmit(formData);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : '폼 제출에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          투표 제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          대표 이미지
        </label>
        {imagePreview && (
          <div className="mb-2">
            <Image
              src={imagePreview}
              alt="Preview"
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={!initialData}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            투표 항목
          </label>
          <button
            type="button"
            onClick={addItem}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            항목 추가
          </button>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">항목 {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  삭제
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설명
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이미지
                  </label>
                  {item.imagePreview && (
                    <div className="mb-2">
                      <Image
                        src={item.imagePreview}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleItemImageUpload(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!initialData}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? '처리중...' : submitText}
        </button>
      </div>
    </form>
  );
} 