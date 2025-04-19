import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

function getS3Client() {
  if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_BUCKET_NAME) {
    const missingVars = [];
    if (!process.env.AWS_REGION) missingVars.push('AWS_REGION');
    if (!process.env.AWS_ACCESS_KEY_ID) missingVars.push('AWS_ACCESS_KEY_ID');
    if (!process.env.AWS_SECRET_ACCESS_KEY) missingVars.push('AWS_SECRET_ACCESS_KEY');
    if (!process.env.AWS_BUCKET_NAME) missingVars.push('AWS_BUCKET_NAME');
    
    throw new Error(`Missing required AWS environment variables: ${missingVars.join(', ')}`);
  }

  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });
}

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export async function uploadToS3(file: File): Promise<string> {
  try {
    const s3Client = getS3Client();
    const key = `uploads/${Date.now()}-${file.name}`;
    const buffer = await file.arrayBuffer();
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(buffer),
      ContentType: file.type
    });

    await s3Client.send(command);
    return key;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

export async function getS3SignedUrl(key: string): Promise<string> {
  try {
    const s3Client = getS3Client();
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
}

export function getPublicUrl(key: string): string {
  try {
    // If the key is already a full URL, return it as is
    if (key.startsWith('http://') || key.startsWith('https://')) {
      return key;
    }
    
    // Return the virtual-hosted style URL
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('Error getting public URL:', error);
    throw error;
  }
}

export async function deleteFromS3(key: string): Promise<boolean> {
  try {
    const s3Client = getS3Client();
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting from S3:', error);
    throw error;
  }
} 