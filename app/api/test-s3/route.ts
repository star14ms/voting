import { NextResponse } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';

export async function GET() {
  try {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    // Try to list objects in the bucket
    const command = new (await import('@aws-sdk/client-s3')).ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
      MaxKeys: 1,
    });

    await s3Client.send(command);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to S3 bucket' 
    });
  } catch (error) {
    console.error('S3 connection test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to connect to S3 bucket',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 