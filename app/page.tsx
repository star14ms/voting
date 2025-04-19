import { getVotes } from '@/lib/actions/votes';
import VoteCard from '@/components/VoteCard';
import Link from 'next/link';
import SeedButton from './components/SeedButton';

export default async function Home() {
  const votes = await getVotes();

  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">투표 목록</h1>
          <div className="flex space-x-4">
            <Link
              href="/vote-items"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              투표 항목 관리
            </Link>
            <Link
              href="/votes/create"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              투표 만들기
            </Link>
            <SeedButton />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {votes.map((vote) => (
            <VoteCard key={vote.id} vote={vote} />
          ))}
        </div>
      </div>
    </div>
  );
}
