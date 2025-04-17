import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface CelebrityWithVotes {
  id: number
  name: string
  description: string | null
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    Vote: number
  }
}

interface TVShowWithVotes {
  id: number
  title: string
  description: string | null
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    Vote: number
  }
}

export async function GET() {
  try {
    const [celebrityVotes, tvShowVotes] = await Promise.all([
      prisma.celebrity.findMany({
        include: {
          _count: {
            select: { Vote: true },
          },
        },
        orderBy: {
          Vote: {
            _count: 'desc',
          },
        },
      }) as Promise<CelebrityWithVotes[]>,
      prisma.tVShow.findMany({
        include: {
          _count: {
            select: { Vote: true },
          },
        },
        orderBy: {
          Vote: {
            _count: 'desc',
          },
        },
      }) as Promise<TVShowWithVotes[]>,
    ])

    return NextResponse.json({
      celebrities: celebrityVotes.map((celebrity) => ({
        ...celebrity,
        voteCount: celebrity._count.Vote,
      })),
      tvShows: tvShowVotes.map((show) => ({
        ...show,
        voteCount: show._count.Vote,
      })),
    })
  } catch (error) {
    console.error('Failed to fetch results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    )
  }
} 