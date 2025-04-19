import { getVoteItems } from '@/lib/actions/vote-items';
import VoteItemsClient from './VoteItemsClient';

export default async function VoteItemsPage() {
  const items = await getVoteItems();
  return <VoteItemsClient initialItems={items} />;
} 