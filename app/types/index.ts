export type Celebrity = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TVShow = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type VoteItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  voteCount: number;
  voteId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Vote = {
  id: number;
  type: string;
  items: VoteItem[];
  createdAt: Date;
  updatedAt: Date;
}; 