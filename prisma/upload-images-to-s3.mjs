import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '../.env');
dotenv.config({ path: envPath });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validate required environment variables
const requiredEnvVars = [
  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_BUCKET_NAME'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`- ${envVar}`));
  console.error('\nPlease set these variables in your .env file or environment.');
  process.exit(1);
}

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const TARGET_FOLDER = join(__dirname, '../public/images/sample3/'); // Adjust this path as needed

console.log('S3 Configuration:');
console.log(`- Region: ${process.env.AWS_REGION}`);
console.log(`- Bucket: ${BUCKET_NAME}`);
console.log(`- Target Folder: ${TARGET_FOLDER}`);

async function uploadFileToS3(filePath, fileName) {
  try {
    const fileContent = await readFile(filePath);
    const key = `images/${Date.now()}-${fileName}`;

    if (!BUCKET_NAME) {
      throw new Error('AWS_BUCKET_NAME is not set');
    }

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: 'image/jpeg',
    });

    await s3Client.send(command);
    console.log(`Successfully uploaded ${fileName} to ${key}`);
    return key;
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error);
    throw error;
  }
}

async function uploadImages() {
  try {
    console.log('\nStarting image upload process...');
    console.log(`Target folder: ${TARGET_FOLDER}`);

    // Read all files from the target folder
    const files = await readdir(TARGET_FOLDER);
    console.log(`Found ${files.length} files to upload`);

    // Filter for image files
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} image files`);

    // Upload each image
    for (const file of imageFiles) {
      const filePath = join(TARGET_FOLDER, file);
      console.log(`\nUploading ${file}...`);
      const key = await uploadFileToS3(filePath, file);
      console.log(`Uploaded to: ${key}`);
    }

    console.log('\nAll images uploaded successfully!');
  } catch (error) {
    console.error('\nError during upload process:', error);
    process.exit(1);
  }
}

// Run the upload process
uploadImages(); 