import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface VoteRequest {
  celebrityId?: number
  tvShowId?: number
}

export async function POST(request: Request) {
  try {
    const { celebrityId, tvShowId } = await request.json() as VoteRequest

    if (!celebrityId && !tvShowId) {
      return NextResponse.json(
        { error: 'Either celebrityId or tvShowId must be provided' },
        { status: 400 }
      )
    }

    const vote = await prisma.vote.create({
      data: {
        celebrityId: celebrityId || null,
        tvShowId: tvShowId || null,
      },
    })

    return NextResponse.json(vote)
  } catch (error) {
    console.error('Failed to submit vote:', error)
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    )
  }
} 