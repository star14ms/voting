'use client';

import { SimpleVoteItem } from '@/app/types';
import { getPublicUrl } from '@/lib/s3';
import SelectVoteItemModalClient from './SelectVoteItemModalClient';

type VoteItemWithUrl = SimpleVoteItem & {
  imageUrl: string;
};

export default function SelectVoteItemModal({ 
  isOpen, 
  onClose, 
  onSelect,
  items 
}: { 
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: SimpleVoteItem) => void;
  items: SimpleVoteItem[];
}) {
  if (!isOpen) return null;

  // Generate image URLs on the client
  const itemsWithUrls: VoteItemWithUrl[] = items.map(item => ({
    ...item,
    imageUrl: getPublicUrl(item.image)
  }));

  return (
    <SelectVoteItemModalClient
      isOpen={isOpen}
      onClose={onClose}
      onSelect={onSelect}
      items={itemsWithUrls}
    />
  );
} 