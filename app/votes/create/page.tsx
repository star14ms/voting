import { getVoteItems } from '@/lib/actions/vote-items';
import CreateVoteForm from './CreateVoteForm';

export default async function CreateVotePage() {
  const voteItems = await getVoteItems();

  return <CreateVoteForm initialVoteItems={voteItems} />;
} 