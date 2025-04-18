import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteFromS3 } from '@/lib/s3';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vote = await prisma.vote.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        voteItemVote: {
          include: {
            voteItem: {
              select: {
                id: true,
                name: true,
                description: true,
                image: true,
              }
            }
          }
        }
      }
    });

    if (!vote) {
      return NextResponse.json(
        { error: 'Vote not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(vote);
  } catch (error) {
    console.error('Error fetching vote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vote' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let vote = null;
  try {
    console.log('Received delete request for vote:', params.id);
    
    if (!params.id) {
      console.error('No vote ID provided');
      return NextResponse.json(
        { error: '투표 ID가 필요합니다' },
        { status: 400 }
      );
    }

    const voteId = parseInt(params.id);
    if (isNaN(voteId)) {
      console.error('Invalid vote ID:', params.id);
      return NextResponse.json(
        { error: '유효하지 않은 투표 ID입니다' },
        { status: 400 }
      );
    }

    // Get the vote first to store the image URL
    vote = await prisma.vote.findUnique({
      where: { id: voteId }
    });

    if (!vote) {
      console.error('Vote not found:', voteId);
      return NextResponse.json(
        { error: '투표를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    console.log('Deleting vote:', voteId);

    // Start a transaction to ensure atomicity of database operations
    await prisma.$transaction(async (tx) => {
      // Delete all associated voteItemVotes first
      await tx.voteItemVote.deleteMany({
        where: { voteId }
      });

      // Then delete the vote
      await tx.vote.delete({
        where: { id: voteId }
      });
    });

    console.log('Successfully deleted vote from database:', voteId);

    // After successful database deletion, try to delete the S3 image
    if (vote.image) {
      try {
        // Extract the key from the S3 URL
        const url = new URL(vote.image);
        const parts = url.pathname.split('/');
        const key = parts.slice(2).join('/'); // Skip the bucket name and get the rest of the path
        
        console.log('Attempting to delete S3 image:', key);
        await deleteFromS3(key);
        console.log('Successfully deleted S3 image:', key);
      } catch (s3Error) {
        console.error('S3 이미지 삭제 중 오류:', s3Error);
        // Don't throw the error, just log it since the vote is already deleted
      }
    }

    return NextResponse.json({ 
      message: '투표가 성공적으로 삭제되었습니다' 
    });
  } catch (error) {
    console.error('투표 삭제 중 오류:', error);
    return NextResponse.json(
      { error: '투표 삭제에 실패했습니다' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vote = await prisma.vote.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!vote) {
      return NextResponse.json(
        { error: 'Vote not found' },
        { status: 404 }
      );
    }

    // Reset all vote counts to 0
    await prisma.voteItemVote.updateMany({
      where: { voteId: parseInt(params.id) },
      data: { voteCount: 0 }
    });

    // Return the updated vote with all items
    const updatedVote = await prisma.vote.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        voteItemVote: {
          include: {
            voteItem: {
              select: {
                id: true,
                name: true,
                description: true,
                image: true,
              }
            }
          }
        }
      }
    });

    return NextResponse.json(updatedVote);
  } catch (error) {
    console.error('Error resetting votes:', error);
    return NextResponse.json(
      { error: 'Failed to reset votes' },
      { status: 500 }
    );
  }
}
