import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getPublicUrl } from '@/lib/s3';

type VoteItem = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type SelectVoteItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: VoteItem) => void;
};

export default function SelectVoteItemModal({ isOpen, onClose, onSelect }: SelectVoteItemModalProps) {
  const [items, setItems] = useState<VoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      fetchItems();
    }
  }, [isOpen]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/vote-items');
      if (!response.ok) {
        throw new Error('Failed to fetch vote items');
      }
      const data = await response.json();
      setItems(data);

      // Pre-fetch image URLs
      const urls: Record<string, string> = {};
      for (const item of data) {
        urls[item.image] = getPublicUrl(item.image);
      }
      setImageUrls(urls);
    } catch (err) {
      console.error('Error fetching vote items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">기존 투표 항목 목록</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-4">로딩 중...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={imageUrls[item.image] || getPublicUrl(item.image)}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 