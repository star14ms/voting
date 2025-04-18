import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteFromS3 } from '@/lib/s3';

export async function GET() {
  try {
    const voteItems = await prisma.voteItem.findMany({
      orderBy: {
        id: 'desc'
      }
    });
    return NextResponse.json(voteItems);
  } catch (error) {
    console.error('투표 항목 조회 중 오류:', error);
    return NextResponse.json(
      { error: '투표 항목을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as string;

    if (!name || !description || !image) {
      return NextResponse.json(
        { error: '이름, 설명, 이미지는 필수 항목입니다' },
        { status: 400 }
      );
    }

    const voteItem = await prisma.voteItem.create({
      data: {
        name,
        description,
        image
      }
    });

    return NextResponse.json(voteItem);
  } catch (error) {
    console.error('투표 항목 생성 중 오류:', error);
    return NextResponse.json(
      { error: '투표 항목 생성에 실패했습니다' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: '투표 항목 ID가 필요합니다' },
        { status: 400 }
      );
    }

    // Check if the item is being used in any votes
    const voteItemVotes = await prisma.voteItemVote.findMany({
      where: { voteItemId: parseInt(id) },
      include: {
        vote: true
      }
    });

    if (voteItemVotes.length > 0) {
      const voteTitles = voteItemVotes.map(v => v.vote.title);
      return NextResponse.json(
        { error: '다음 투표에서 사용 중인 항목은 삭제할 수 없습니다: ', votes: voteTitles },
        { status: 400 }
      );
    }

    // Get the vote item to get the image key before deleting
    const voteItem = await prisma.voteItem.findUnique({
      where: { id: parseInt(id) }
    });

    if (!voteItem) {
      return NextResponse.json(
        { error: '투표 항목을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // Delete the vote item
    await prisma.voteItem.delete({
      where: { id: parseInt(id) }
    });

    // Delete the image from S3
    try {
      await deleteFromS3(voteItem.image);
    } catch (error) {
      console.error('S3 이미지 삭제 중 오류:', error);
      // Continue even if S3 deletion fails
    }

    return NextResponse.json(
      { message: '투표 항목이 성공적으로 삭제되었습니다' },
      { status: 200 }
    );
  } catch (error) {
    console.error('투표 항목 삭제 중 오류:', error);
    return NextResponse.json(
      { error: '투표 항목 삭제에 실패했습니다' },
      { status: 500 }
    );
  }
} 