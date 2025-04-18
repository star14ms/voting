import { ChangeEvent } from 'react';
import Image from 'next/image';

type VoteItem = {
  name: string;
  description: string;
  image: File | null;
  imagePreview?: string;
};

type VoteItemFormProps = {
  item: VoteItem;
  index: number;
  onRemove: () => void;
  onChange: (index: number, field: keyof VoteItem, value: string | File) => void;
  showRemove: boolean;
};

export default function VoteItemForm({ item, index, onRemove, onChange, showRemove }: VoteItemFormProps) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(index, 'image', file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(index, 'imagePreview', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 border rounded-lg relative">
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름
          </label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
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
            onChange={(e) => onChange(index, 'description', e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
            rows={2}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이미지
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
            required
          />
          {item.imagePreview && (
            <div className="mt-2">
              <Image
                src={item.imagePreview}
                alt="Preview"
                width={100}
                height={100}
                className="rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 