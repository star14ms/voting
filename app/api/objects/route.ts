import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const objects = await prisma.voteObject.findMany({
      where: {
        Vote: {
          type: type || undefined
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true
      }
    });

    return NextResponse.json(objects);
  } catch (error) {
    console.error('Error fetching objects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch objects' },
      { status: 500 }
    );
  }
} 