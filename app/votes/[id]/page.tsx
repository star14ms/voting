'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPublicUrl } from '@/lib/s3';
import { getVote, voteForItem, removeVote, resetVotes, getUserVoteItem } from '@/lib/actions/votes';
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
  const { data: session, status } = useSession();
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
      await removeVote(params.id, itemId, session.user.id);
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
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="text-center">
              <Skeleton variant="image" className="h-64 w-full mb-6" />
              <Skeleton variant="text" className="h-8 w-3/4 mx-auto mb-4" />
              <Skeleton variant="text" className="h-4 w-1/2 mx-auto" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 w-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              🏆 상위 3위
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 relative mb-16">
              {[1, 0, 2].map((position) => (
                <div key={position} className="flex flex-col items-center justify-end">
                  <div className={`relative rounded-xl shadow-xl ${
                    position === 0 ? 'bg-gradient-to-br from-yellow-50 via-white to-yellow-50 border-t-[6px] border-yellow-400' :
                    position === 1 ? 'bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t-4 border-gray-400' :
                    'bg-gradient-to-br from-orange-50 via-white to-orange-50 border-t-4 border-orange-400'
                  } transform hover:scale-[1.02] transition-all duration-300 relative`}>
                    <div className="relative">
                      <div className={`relative mb-4 overflow-hidden rounded-t-xl ${
                        position === 0 ? 'bg-yellow-50' :
                        position === 1 ? 'bg-gray-50' :
                        'bg-orange-50'
                      }`}>
                        <Skeleton variant="image" className="h-[440px] w-[330px]" />
                      </div>
                      <div className="absolute -top-6 -left-6 flex items-center justify-center">
                        <div className={`${
                          position === 0 ? 'w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-300' :
                          position === 1 ? 'w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-200' :
                          'w-12 h-12 bg-gradient-to-r from-orange-300 to-orange-200'
                        } shadow-lg rounded-full flex items-center justify-center text-white font-bold text-2xl z-10`}>
                          <div className={`rounded-full flex items-center justify-center border-2 ${
                            position === 0 ? 'w-12 h-12 border-yellow-400' :
                            position === 1 ? 'w-10 h-10 border-gray-400' :
                            'w-10 h-10 border-orange-400'
                          }`}>
                            {position + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`p-6 ${
                      position === 0 ? 'bg-yellow-50' :
                      position === 1 ? 'bg-gray-50' :
                      'bg-orange-50'
                    }`}>
                      <Skeleton variant="text" className={`${
                        position === 0 ? 'text-2xl text-yellow-800' :
                        position === 1 ? 'text-xl text-gray-800' :
                        'text-xl text-orange-800'
                      } h-8 w-3/4 mb-3`} />
                      <Skeleton variant="text" className={`${
                        position === 0 ? 'text-yellow-700' :
                        position === 1 ? 'text-gray-700' :
                        'text-orange-700'
                      } h-4 w-full mb-4`} />
                      <div className="flex justify-between items-center">
                        <Skeleton variant="text" className={`${
                          position === 0 ? 'text-xl text-yellow-600' :
                          position === 1 ? 'text-lg text-gray-600' :
                          'text-lg text-orange-600'
                        } h-6 w-20`} />
                        <Skeleton variant="button" className={`${
                          position === 0 ? 'bg-yellow-100' :
                          position === 1 ? 'bg-gray-100' :
                          'bg-orange-100'
                        } w-24 h-8`} />
                      </div>
                    </div>
                  </div>
                  <div className={`w-full relative ${
                    position === 0 ? 'h-[200px] bg-gradient-to-b from-yellow-400/20 to-transparent' :
                    position === 1 ? 'h-[160px] bg-gradient-to-b from-gray-400/20 to-transparent' :
                    'h-[120px] bg-gradient-to-b from-orange-400/20 to-transparent'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-4xl font-bold ${
                        position === 0 ? 'text-yellow-600/50' :
                        position === 1 ? 'text-gray-600/50' :
                        'text-orange-600/50'
                      }`}>
                        {position + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">전체 항목</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md transition-all duration-300 relative">
                  <div className="flex">
                    <div className="relative w-[140px] h-[200px]">
                      <div className="relative h-full overflow-hidden rounded-l-xl">
                        <Skeleton variant="image" className="h-full w-full" />
                      </div>
                    </div>
                    <div className="p-6">
                      <Skeleton variant="text" className="h-6 w-3/4 mb-2" />
                      <Skeleton variant="text" className="h-4 w-full mb-2" />
                      <div className="flex justify-between items-center">
                        <Skeleton variant="text" className="h-6 w-20" />
                        <Skeleton variant="button" className="w-24 h-8" />
                      </div>
                    </div>
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

  // Get remaining items for the list in descending ID order
  const remainingItems = vote.voteItemVote
    .filter(item => !top3Items.some(topItem => topItem.voteItem.id === item.voteItem.id))
    .sort((a, b) => b.voteItem.id - a.voteItem.id);

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
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
                <div key={item.voteItem.id} className="flex flex-col-reverse items-center justify-start w-1/3">
                  <div className={`relative rounded-xl shadow-xl ${style.card} ${
                    index === 0 ? 'md:order-2' : 
                    index === 1 ? 'md:order-1' : 
                    'md:order-3'
                  }`}>
                    <div className="relative">
                      <div className={`relative ${style.image} mb-4 overflow-hidden rounded-t-xl h-[440px]`}>
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
                        {selectedItem === item.voteItem.id && !isVoting ? (
                          <button
                            onClick={() => handleRemoveVote(item.voteItem.id)}
                            disabled={isVoting}
                            className="text-sm font-medium text-green-600 bg-green-50 px-3 py-2 rounded-full hover:bg-green-100 transition-colors flex items-center gap-1"
                          >
                            ✓ 투표 완료
                          </button>
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
                  selectedItem === item.voteItem.id && !isVoting ? 'outline outline-4 outline-blue-500 outline-offset-2 bg-blue-50' : ''
                }`}
              >
                <div className="flex">
                  <div className="relative w-[150px] h-[200px] flex-shrink-0">
                    <div className="relative h-full overflow-hidden rounded-l-xl">
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
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.voteItem.name}</h3>
                      <p className="text-gray-600 mb-2">{item.voteItem.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-700">{item.voteCount.toLocaleString()}표</span>
                      <div className="w-24 text-right">
                        {selectedItem === item.voteItem.id && !isVoting ? (
                          <button
                            onClick={() => handleRemoveVote(item.voteItem.id)}
                            disabled={isVoting}
                            className="text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                          >
                            ✓ 투표 완료
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

        <div className="flex items-center justify-between mt-8">
          <div></div>
          {status === 'authenticated' && (
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