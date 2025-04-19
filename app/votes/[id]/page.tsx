'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/s3';
import { getVote, voteForItem, removeVote, resetVotes, deleteVote, getUserVoteItem } from '@/lib/actions/votes';
import { VoteResponse } from '@/app/types';
import VoteRemoveModal from '@/app/components/VoteRemoveModal';
import { useSession } from 'next-auth/react';
import Skeleton from '@/app/components/Skeleton';

// Add this CSS at the top of your file
const medalStyles = {
  first: {
    badge: 'w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-lg',
    card: 'bg-gradient-to-br from-yellow-50 via-white to-yellow-50 border-t-[6px] border-yellow-400 transform hover:scale-[1.02] transition-all duration-300 relative',
    selected: 'bg-gradient-to-br from-blue-50 via-white to-blue-50 border-t-[6px] border-blue-400',
    image: 'h-72',
    text: 'text-2xl text-yellow-800',
    votes: 'text-xl font-bold text-yellow-600',
    crown: '👑'
  },
  second: {
    badge: 'w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-200 shadow-md',
    card: 'bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t-4 border-gray-400 transform hover:scale-[1.01] transition-all duration-300 relative',
    selected: 'bg-gradient-to-br from-blue-50 via-white to-blue-50 border-t-4 border-blue-400',
    image: 'h-72',
    text: 'text-xl text-gray-800',
    votes: 'text-lg font-bold text-gray-600',
    crown: '🥈'
  },
  third: {
    badge: 'w-12 h-12 bg-gradient-to-r from-orange-300 to-orange-200 shadow-md',
    card: 'bg-gradient-to-br from-orange-50 via-white to-orange-50 border-t-4 border-orange-400 transform hover:scale-[1.01] transition-all duration-300 relative',
    selected: 'bg-gradient-to-br from-blue-50 via-white to-blue-50 border-t-4 border-blue-400',
    image: 'h-72',
    text: 'text-xl text-orange-800',
    votes: 'text-lg font-bold text-orange-600',
    crown: '🥉'
  }
};

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

  useEffect(() => {
    if (!params?.id) {
      setError('Invalid vote ID');
      setIsLoading(false);
      return;
    }

    const fetchVote = async () => {
      try {
        if (vote == null) {
          setIsLoading(true);
        }
        setError(null);
        const data = await getVote(params.id);
        
        if (!data || !data.voteItemVote || !Array.isArray(data.voteItemVote)) {
          throw new Error('Invalid vote data');
        }
        
        setVote(data);
        
        // Check if user has already voted
        if (session?.user?.id) {
          const userVote = await getUserVoteItem(params.id, session.user.id);
          if (userVote) {
            setSelectedItem(userVote);
            setHasVoted(true);
          }
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
        if (vote == null) {
          setIsLoading(false);
        }
      }
    };

    fetchVote();
  }, [params?.id, session?.user?.id, selectedItem]);

  const handleVote = async (itemId: number) => {
    if (session?.user?.id === undefined) {
      router.push('/auth/signin');
      return;
    }

    try {
      setIsVoting(true);
      setError(null);
      await voteForItem(params.id, itemId, session.user.id);
      setHasVoted(true);
      setSelectedItem(itemId);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '투표에 실패했습니다');
    } finally {
      setIsVoting(false);
    }
  };

  const handleRemoveVote = async (itemId: number) => {
    if (!session?.user?.id) {
      router.push('/auth/signin');
      return;
    }

    try {
      setIsVoting(true);
      setError(null);
      await removeVote(params.id, itemId);
      setHasVoted(false);
      setSelectedItem(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '투표 취소에 실패했습니다');
    } finally {
      setIsVoting(false);
    }
  };

  const handleChangeVote = async (newItemId: number) => {
    if (selectedItem === newItemId || isVoting) return;
    
    try {
      setIsVoting(true);
      setError(null);
      
      // First, remove the previous vote
      await handleRemoveVote(selectedItem!);
      
      // Then, add the new vote
      await handleVote(newItemId);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '투표 변경에 실패했습니다');
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
    } catch (error) {
      console.error('Error resetting votes:', error);
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsResetting(false);
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
              <Skeleton variant="image" className="h-72 w-full mb-6" />
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
        <div className="w-full max-h-6xl">
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
        <div className="w-full max-h-6xl">
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

  // Sort vote items by vote count
  const sortedItems = [...vote.voteItemVote].sort((a, b) => {
    const aVotes = a.voteCount || 0;
    const bVotes = b.voteCount || 0;
    return bVotes - aVotes;
  });

  // Apply Olympic ranking to all items
  const rankedItems = [];
  let currentRank = 1;
  let currentVotes = sortedItems[0]?.voteCount || 0;
  let skipCount = 0;

  for (let i = 0; i < sortedItems.length; i++) {
    const item = sortedItems[i];
    if (item.voteCount !== currentVotes) {
      currentRank += skipCount;
      currentVotes = item.voteCount || 0;
      skipCount = 0;
    }
    rankedItems.push({ ...item, rank: currentRank });
    skipCount++;
  }

  // Get top 3 items for display
  const top3Items = rankedItems.filter(item => item.rank <= 3);
  top3Items.sort((a, b) => a.rank - b.rank);

  // Get remaining items for the list
  const remainingItems = rankedItems.filter(item => item.rank > 3);

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← 홈으로 돌아가기
          </Link>
          {true && (
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

        <div className="bg-white rounded-lg shadow p-6 mb-8">
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
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            🏆 상위 3위
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 relative mb-16">
            {[top3Items[1], top3Items[0], top3Items[2]].map((item, index) => {
              const style = item.rank === 1 ? medalStyles.first : 
                           item.rank === 2 ? medalStyles.second : medalStyles.third;
              return (
                <div key={item.voteItem.id} className="flex flex-col-reverse items-center justify-start">
                  <div className={`relative rounded-xl shadow-xl ${style.card} ${
                    index === 0 ? 'md:order-2' : 
                    index === 1 ? 'md:order-1' : 
                    'md:order-3'
                  }`}>
                    <div className="relative">
                      <div className={`relative ${style.image} mb-4 overflow-hidden rounded-t-xl`}>
                        <Image
                          src={imageUrls[item.voteItem.image] || getPublicUrl(item.voteItem.image)}
                          alt={item.voteItem.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                      <div className="absolute -top-6 -left-6 flex items-center justify-center">
                        <div className={`${style.badge} rounded-full flex items-center justify-center text-white font-bold text-2xl z-10`}>
                          <div className={`rounded-full flex items-center justify-center border-2 ${
                            item.rank === 1 ? 'w-12 h-12' : 'w-10 h-10'
                          }`}
                            style={{
                              borderColor: item.rank === 1 ? '#FFC000' : 
                                         item.rank === 2 ? '#D0D0D0' : 
                                         '#D98C4A'
                            }}
                          >
                            {item.rank}
                          </div>
                        </div>
                        {item.rank === 1 && (
                          <div className="absolute -top-6 text-4xl z-20">
                            {style.crown}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`${style.text} font-bold mb-3 flex items-center gap-2`}>
                        {item.voteItem.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{item.voteItem.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className={style.votes}>
                            {item.voteCount.toLocaleString()}표
                          </span>
                        </div>
                        {selectedItem === item.voteItem.id ? (
                          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-2 rounded-full flex items-center gap-1">
                            ✓ 투표 완료
                          </span>
                        ) : (
                          <button
                            onClick={() => hasVoted ? handleChangeVote(item.voteItem.id) : handleVote(item.voteItem.id)}
                            disabled={isVoting}
                            className={`${
                              isVoting 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                            } text-white px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105`}
                          >
                            {isVoting ? '투표 중...' : '투표하기'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`w-full relative ${
                    item.rank === 1 ? 'h-[200px] bg-yellow-400/20' :  // 5 * 40px
                    item.rank === 2 ? 'h-[160px] bg-gray-400/20' :   // 4 * 40px
                    'h-[120px] bg-orange-400/20'                 // 3 * 40px
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-600/50">
                        {item.rank}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">전체 항목</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rankedItems.map((item) => (
              <div
                key={item.voteItem.id}
                className={`bg-white rounded-xl shadow-md transition-all duration-300 relative ${
                  selectedItem === item.voteItem.id ? 'outline outline-4 outline-blue-500 outline-offset-2 bg-blue-50' : ''
                } ${
                  item.rank <= 3 
                    ? `border-l-4 ${
                        item.rank === 1 
                          ? 'border-l-yellow-400 bg-yellow-50/50' 
                          : item.rank === 2 
                            ? 'border-l-gray-400 bg-gray-50/50' 
                            : 'border-l-orange-400 bg-orange-50/50'
                      }`
                    : ''
                }`}
              >
                <div className="flex">
                  <div className="relative w-1/2">
                    <div className="relative h-48 overflow-hidden rounded-l-xl">
                      <Image
                        src={imageUrls[item.voteItem.image] || getPublicUrl(item.voteItem.image)}
                        alt={item.voteItem.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{
                        background: item.rank === 1 ? 'linear-gradient(to right, #FFD700, #FFE44D)' : 
                                  item.rank === 2 ? 'linear-gradient(to right, #C0C0C0, #E0E0E0)' : 
                                  item.rank === 3 ? 'linear-gradient(to right, #CD7F32, #E6A15C)' : 
                                  'linear-gradient(to right, #6B7280, #9CA3AF)'
                      }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                        style={{
                          borderColor: item.rank === 1 ? '#FFC000' : 
                                     item.rank === 2 ? '#D0D0D0' : 
                                     item.rank === 3 ? '#D98C4A' : '#7F8A9A'
                        }}
                      >
                        {item.rank}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.voteItem.name}</h3>
                    <p className="text-gray-600 mb-2">{item.voteItem.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-700">{item.voteCount.toLocaleString()}표</span>
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