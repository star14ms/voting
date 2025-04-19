import { Vote as PrismaVote, VoteItem as PrismaVoteItem, VoteItemVote as PrismaVoteItemVote } from '@prisma/client';

// Base types
export type BaseVoteItem = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type BaseVoteItemVote = {
  id: number;
  voteItemId: number;
  voteId: number;
  voteCount: number;
};

export type BaseVote = {
  id: number;
  title: string;
  type: string;
  image: string;
};

// Client-side types with string dates
export type VoteItem = BaseVoteItem & {
  createdAt: string;
  updatedAt: string;
};

export type VoteItemVote = BaseVoteItemVote & {
  voteItem: VoteItem;
};

export type Vote = BaseVote & {
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  voteItemVote: VoteItemVote[];
};

// Server response types with Date objects
export type VoteItemResponse = BaseVoteItem & {
  createdAt: Date;
  updatedAt: Date;
};

export type VoteItemVoteResponse = BaseVoteItemVote & {
  voteItem: VoteItemResponse;
};

export type VoteResponse = {
  id: number;
  title: string;
  type: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  voteItemVote: VoteItemVoteResponse[];
};

// Extended types for server responses
export type VoteWithItems = PrismaVote & {
  voteItemVote: (PrismaVoteItemVote & {
    voteItem: Pick<PrismaVoteItem, 'id' | 'name' | 'description' | 'image'>;
  })[];
};

// Simplified types for client use
export type SimpleVoteItem = Pick<PrismaVoteItem, 'id' | 'name' | 'description' | 'image'>; 