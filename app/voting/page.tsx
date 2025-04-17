import { prisma } from "@/lib/prisma";
import { Celebrity, TVShow } from "../types";
import { voteForCelebrity, voteForTVShow } from "../actions/vote";

export default async function VotingPage() {
  const celebrities = await prisma.celebrity.findMany();
  const tvShows = await prisma.tVShow.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Voting System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Celebrities Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Celebrities</h2>
          <div className="space-y-4">
            {celebrities.map((celebrity: Celebrity) => (
              <div key={celebrity.id} className="border p-4 rounded">
                <h3 className="text-xl font-medium">{celebrity.name}</h3>
                {celebrity.description && (
                  <p className="text-gray-600 mt-2">{celebrity.description}</p>
                )}
                <form action={async () => {
                  'use server';
                  await voteForCelebrity(celebrity.id);
                }}>
                  <button 
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Vote
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

        {/* TV Shows Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">TV Shows</h2>
          <div className="space-y-4">
            {tvShows.map((show: TVShow) => (
              <div key={show.id} className="border p-4 rounded">
                <h3 className="text-xl font-medium">{show.title}</h3>
                {show.description && (
                  <p className="text-gray-600 mt-2">{show.description}</p>
                )}
                <form action={async () => {
                  'use server';
                  await voteForTVShow(show.id);
                }}>
                  <button 
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Vote
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 