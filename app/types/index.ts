export type VoteItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type VoteItemVote = {
  id: number;
  voteItemId: number;
  voteId: number;
  voteCount: number;
  voteItem: VoteItem;
};

export type Vote = {
  id: number;
  title: string;
  type: string;
  image: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  voteItemVote: VoteItemVote[];
}; 