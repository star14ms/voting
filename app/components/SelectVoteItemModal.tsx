'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { SimpleVoteItem } from '@/app/types';
import { getPublicUrl } from '@/lib/s3';

type VoteItemWithUrl = SimpleVoteItem & {
  imageUrl: string;
};

interface SelectVoteItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: SimpleVoteItem) => void;
  items: SimpleVoteItem[];
}

export default function SelectVoteItemModal({
  isOpen,
  onClose,
  onSelect,
  items,
}: SelectVoteItemModalProps) {
  if (!isOpen) return null;

  // Generate image URLs on the client
  const itemsWithUrls: VoteItemWithUrl[] = items.map(item => ({
    ...item,
    imageUrl: getPublicUrl(item.image)
  }));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  투표 항목 선택
                </Dialog.Title>
                <div className="mt-4">
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {itemsWithUrls.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => onSelect(item)}
                      >
                        <div className="relative w-16 h-16">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 