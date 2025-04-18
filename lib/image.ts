import { getPublicUrl } from './s3';

export async function getImageUrl(imageUrl: string): Promise<string> {
  // If the URL is already a signed URL, return it
  if (imageUrl.includes('X-Amz-Signature')) {
    return imageUrl;
  }

  // If it's a blob URL (preview), return it
  if (imageUrl.startsWith('blob:')) {
    return imageUrl;
  }

  try {
    // If the input is already just a key (e.g., 'images/1234-file.jpg')
    if (!imageUrl.startsWith('http')) {
      return await getPublicUrl(imageUrl);
    }

    // Extract the key from the S3 URL
    const url = new URL(imageUrl);
    const parts = url.pathname.split('/');
    // Skip the bucket name and get the rest of the path
    const key = parts.slice(2).join('/');

    // Get a new signed URL
    return await getPublicUrl(key);
  } catch (error) {
    console.error('Error getting image URL:', error);
    return imageUrl;
  }
} 