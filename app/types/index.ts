export type VoteItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
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
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  voteItemVote: VoteItemVote[];
}; 