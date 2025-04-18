'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/s3';

type VoteItem = {
  id: number;
  name: string;
  description: string;
  image: string;
};

type Vote = {
  id: number;
  title: string;
  type: 'CELEBRITY' | 'TVSHOW';
  image: string;
  startDate: string;
  endDate: string;
  voteItemVote: {
    id: number;
    voteCount: number;
    voteItem: VoteItem;
  }[];
};

export default function VotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [vote, setVote] = useState<Vote | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

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
        const response = await fetch(`/api/votes/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch vote');
        }
        
        const data = await response.json();
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
      const response = await fetch(`/api/votes/${params.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        setHasVoted(true);
        setSelectedItem(itemId);
        localStorage.setItem(`vote_${params.id}`, itemId.toString());
        
        // Refresh vote data to get updated counts
        const updatedResponse = await fetch(`/api/votes/${params.id}`);
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setVote(updatedData);
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
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
      await fetch(`/api/votes/${params.id}/vote`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: selectedItem }),
      });

      // Then, add the new vote
      await handleVote(newItemId);
    } catch (error) {
      console.error('Error changing vote:', error);
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
      const response = await fetch(`/api/votes/${params.id}/reset`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedData = await response.json();
        setVote(updatedData);
        setSelectedItem(null);
        setHasVoted(false);
        localStorage.removeItem(`vote_${params.id}`);
      }
    } catch (error) {
      console.error('Error resetting votes:', error);
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteVote = async () => {
    if (isDeleting) return;
    
    try {
      setIsDeleting(true);
      console.log('Attempting to delete vote:', params.id);
      
      const response = await fetch(`/api/votes/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        const data = await response.json();
        console.error('Delete error response:', data);
        throw new Error(data.error || '투표 삭제에 실패했습니다');
      }

      const data = await response.json();
      console.log('Delete success response:', data);

      // Redirect to home page after successful deletion
      router.push('/');
    } catch (error) {
      console.error('Error deleting vote:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('투표 삭제 중 오류가 발생했습니다');
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!vote) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-gray-500 mb-4">Vote not found</div>
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              ← Back to Home
            </Link>
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
          </div>
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
              <span>투표 기간: {new Date(vote.startDate).toLocaleDateString()} ({new Date(vote.startDate).toLocaleDateString('ko-KR', { weekday: 'short' })}) - {new Date(vote.endDate).toLocaleDateString()} ({new Date(vote.endDate).toLocaleDateString('ko-KR', { weekday: 'short' })})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vote.voteItemVote?.map((item) => (
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
                <div>
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
                        {hasVoted ? '변경하기' : '투표하기'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">투표 삭제 확인</h3>
              <p className="text-gray-600 mb-6">
                이 투표를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteVote}
                  disabled={isDeleting}
                  className={`${
                    isDeleting 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-red-700 hover:bg-red-800'
                  } text-white px-4 py-2 rounded-lg transition-colors`}
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 