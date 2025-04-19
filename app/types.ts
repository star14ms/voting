export type VoteResponse = {
  id: number;
  title: string;
  type: 'CELEBRITY' | 'TVSHOW';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  voteCount: number;
}; 