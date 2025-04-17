'use client'

import { useState, useEffect } from 'react'

interface Celebrity {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
  voteCount?: number
}

interface TVShow {
  id: number
  title: string
  description: string | null
  imageUrl: string | null
  voteCount?: number
}

export default function Home() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([])
  const [tvShows, setTVShows] = useState<TVShow[]>([])
  const [selectedCelebrity, setSelectedCelebrity] = useState<number | null>(null)
  const [selectedTVShow, setSelectedTVShow] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    try {
      const response = await fetch('/api/candidates')
      if (!response.ok) {
        throw new Error('Failed to fetch candidates')
      }
      const data = await response.json()
      setCelebrities(data.celebrities)
      setTVShows(data.tvShows)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch candidates:', error)
      setError('Failed to load candidates. Please try again later.')
      setIsLoading(false)
    }
  }

  const handleVote = async () => {
    if (!selectedCelebrity && !selectedTVShow) {
      setError('Please select at least one candidate to vote for')
      return
    }

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          celebrityId: selectedCelebrity,
          tvShowId: selectedTVShow,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit vote')
      }

      // Refresh results after voting
      const resultsResponse = await fetch('/api/results')
      if (!resultsResponse.ok) {
        throw new Error('Failed to fetch updated results')
      }
      const resultsData = await resultsResponse.json()
      setCelebrities(resultsData.celebrities)
      setTVShows(resultsData.tvShows)

      // Reset selections and error
      setSelectedCelebrity(null)
      setSelectedTVShow(null)
      setError(null)
    } catch (error) {
      console.error('Failed to submit vote:', error)
      setError('Failed to submit vote. Please try again later.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Voting System</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Celebrities Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Celebrities</h2>
          <div className="space-y-4">
            {celebrities.map((celebrity) => (
              <div
                key={celebrity.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCelebrity === celebrity.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCelebrity(celebrity.id)}
              >
                <h3 className="font-medium">{celebrity.name}</h3>
                {celebrity.description && (
                  <p className="text-gray-600">{celebrity.description}</p>
                )}
                {celebrity.voteCount !== undefined && (
                  <p className="text-sm text-gray-500">Votes: {celebrity.voteCount}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TV Shows Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">TV Shows</h2>
          <div className="space-y-4">
            {tvShows.map((show) => (
              <div
                key={show.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTVShow === show.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTVShow(show.id)}
              >
                <h3 className="font-medium">{show.title}</h3>
                {show.description && (
                  <p className="text-gray-600">{show.description}</p>
                )}
                {show.voteCount !== undefined && (
                  <p className="text-sm text-gray-500">Votes: {show.voteCount}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleVote}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={!selectedCelebrity && !selectedTVShow}
        >
          Submit Vote
        </button>
      </div>
    </main>
  )
} 