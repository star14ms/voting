import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [celebrities, tvShows] = await Promise.all([
      prisma.celebrity.findMany(),
      prisma.tVShow.findMany(),
    ])

    return NextResponse.json({
      celebrities,
      tvShows,
    })
  } catch (error) {
    console.error('Failed to fetch candidates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch candidates' },
      { status: 500 }
    )
  }
} 