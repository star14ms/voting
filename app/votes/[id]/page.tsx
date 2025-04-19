'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/s3';
import { getVote, voteForItem, removeVote, resetVotes, deleteVote } from '@/lib/actions/votes';
import { VoteResponse } from '@/app/types';
import VoteRemoveModal from '@/app/components/VoteRemoveModal';
import { useSession } from 'next-auth/react';
import Skeleton from '@/app/components/Skeleton';

export default function VotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [vote, setVote] = useState<VoteResponse | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  console.log(isVoting)

  useEffect(() => {
    if (!params?.id) {
      setError('Invalid vote ID');
      setIsLoading(false);
      return;
    }

    const fetchVote = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getVote(params.id);
        
        if (!data || !data.voteItemVote || !Array.isArray(data.voteItemVote)) {
          throw new Error('Invalid vote data');
        }
        
        setVote(data);
        
        // Check if user has already voted
        const votedItemId = localStorage.getItem(`vote_${params.id}`);
        if (votedItemId) {
          setSelectedItem(Number(votedItemId));
          setHasVoted(true);
        }

        // Pre-fetch image URLs
        const urls: Record<string, string> = {};
        if (data.image) {
          urls[data.image] = getPublicUrl(data.image);
        }
        for (const item of data.voteItemVote) {
          if (item.voteItem?.image) {
            urls[item.voteItem.image] = getPublicUrl(item.voteItem.image);
          }
        }
        setImageUrls(urls);
      } catch (err) {
        console.error('Error fetching vote:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch vote');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVote();
  }, [params?.id]);

  const handleVote = async (itemId: number) => {
    if (isVoting) return;
    
    try {
      setIsVoting(true);
      if (!session?.user?.id) {
        router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }
      
      await voteForItem(params.id, itemId, session.user.id);
      
      setHasVoted(true);
      setSelectedItem(itemId);
      localStorage.setItem(`vote_${params.id}`, itemId.toString());
      
      // Refresh vote data
      const updatedData = await getVote(params.id);
      setVote(updatedData);
    } catch (error) {
      console.error('Error voting:', error);
      if (error instanceof Error) {
        if (error.message === '로그인이 필요합니다') {
          router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
          return;
        }
        setError(error.message);
      }
    } finally {
      setIsVoting(false);
    }
  };

  const handleChangeVote = async (newItemId: number) => {
    if (selectedItem === newItemId || isVoting) return;
    
    try {
      setIsVoting(true);
      // Update UI immediately for better UX
      if (vote) {
        const updatedItems = vote.voteItemVote.map(item => {
          if (item.voteItem.id === selectedItem) {
            return { ...item, voteCount: item.voteCount - 1 };
          }
          if (item.voteItem.id === newItemId) {
            return { ...item, voteCount: item.voteCount + 1 };
          }
          return item;
        });
        setVote({ ...vote, voteItemVote: updatedItems });
      }

      // First, remove the previous vote
      await removeVote(params.id, selectedItem!);

      // Then, add the new vote
      await handleVote(newItemId);
    } catch (error) {
      console.error('Error changing vote:', error);
      if (error instanceof Error) {
        setError(error.message);
      }
      // Revert UI changes if API call fails
      if (vote) {
        const revertedItems = vote.voteItemVote.map(item => {
          if (item.voteItem.id === selectedItem) {
            return { ...item, voteCount: item.voteCount + 1 };
          }
          if (item.voteItem.id === newItemId) {
            return { ...item, voteCount: item.voteCount - 1 };
          }
          return item;
        });
        setVote({ ...vote, voteItemVote: revertedItems });
      }
    } finally {
      setIsVoting(false);
    }
  };

  const handleResetVotes = async () => {
    if (isResetting) return;
    
    try {
      setIsResetting(true);
      const updatedData = await resetVotes(params.id);
      setVote(updatedData);
      setSelectedItem(null);
      setHasVoted(false);
      localStorage.removeItem(`vote_${params.id}`);
    } catch (error) {
      console.error('Error resetting votes:', error);
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteVote = async () => {
    if (isDeleting) return;
    
    try {
      setIsDeleting(true);
      await deleteVote(params.id);
      setVote(null);
      setSelectedItem(null);
      setHasVoted(false);
      localStorage.removeItem(`vote_${params.id}`);
    } catch (error) {
      console.error('Error deleting vote:', error);
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <Skeleton variant="text" className="w-32" />
            <div className="flex gap-2">
              <Skeleton variant="button" />
              <Skeleton variant="button" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <Skeleton variant="image" className="h-64 w-full mb-6" />
              <Skeleton variant="text" className="h-8 w-3/4 mx-auto mb-4" />
              <Skeleton variant="text" className="h-4 w-1/2 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-4">
                  <Skeleton variant="image" className="h-48 mb-4" />
                  <Skeleton variant="text" className="mb-2" />
                  <Skeleton variant="text" className="w-3/4" />
                  <div className="flex justify-between items-center mt-4">
                    <Skeleton variant="text" className="w-24" />
                    <Skeleton variant="button" />
                  </div>
                </div>
              ))}
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
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← 홈으로 돌아가기
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-red-500 mb-4">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!vote) {
    return (
      <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← 홈으로 돌아가기
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 mb-4">투표를 찾을 수 없습니다</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← 홈으로 돌아가기
          </Link>
          {session?.user && (
            <div className="flex gap-2">
              <button
                onClick={handleResetVotes}
                disabled={isResetting}
                className={`${
                  isResetting 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600'
                } text-white px-4 py-2 rounded-lg transition-colors`}
              >
                {isResetting ? '초기화 중...' : '투표 초기화'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
                className={`${
                  isDeleting 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-red-700 hover:bg-red-800'
                } text-white px-4 py-2 rounded-lg transition-colors`}
              >
                {isDeleting ? '삭제 중...' : '투표 삭제'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="relative h-64 w-full mb-6">
              <Image
                src={imageUrls[vote.image] || getPublicUrl(vote.image)}
                alt={vote.title}
                fill
                className="object-cover rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{vote.title}</h1>
            <div className="text-sm text-gray-500">
              <span>투표 기간: {vote.startDate.toLocaleDateString()} ({vote.startDate.toLocaleDateString('ko-KR', { weekday: 'short' })}) - {vote.endDate.toLocaleDateString()} ({vote.endDate.toLocaleDateString('ko-KR', { weekday: 'short' })})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {vote.voteItemVote.map((item) => (
              <div
                key={item.voteItem.id}
                className={`bg-white rounded-xl shadow p-4 transition-all ${
                  selectedItem === item.voteItem.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="relative h-48 mb-4">
                  <Image
                    src={imageUrls[item.voteItem.image] || getPublicUrl(item.voteItem.image)}
                    alt={item.voteItem.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.voteItem.name}</h3>
                  <p className="text-gray-600 mb-2">{item.voteItem.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">투표수: {item.voteCount}</span>
                  <div className="w-24 text-right">
                    {selectedItem === item.voteItem.id ? (
                      <button
                        disabled
                        className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                      >
                        투표 완료
                      </button>
                    ) : (
                      <button
                        onClick={() => hasVoted ? handleChangeVote(item.voteItem.id) : handleVote(item.voteItem.id)}
                        disabled={isVoting}
                        className={`${
                          isVoting 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white px-4 py-2 rounded-lg transition-colors`}
                      >
                        {isVoting ? '투표 중...' : '투표하기'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <VoteRemoveModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        voteId={Number(params.id)}
        voteTitle={vote?.title || ''}
      />
    </div>
  );
} 