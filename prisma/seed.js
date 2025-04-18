import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient({
  log: ['query', 'error']
});

async function main() {
  try {
    // Convert images to base64
    const convertImageToBase64 = (imagePath) => {
      try {
        const fullPath = join(process.cwd(), 'public', 'images', imagePath);
        console.log(`Reading image: ${imagePath}`);
        const buffer = readFileSync(fullPath);
        const extension = imagePath.split('.').pop().toLowerCase();
        const mimeType = extension === 'jpg' || extension === 'jpeg' ? 'jpeg' : extension;
        return `data:image/${mimeType};base64,${buffer.toString('base64')}`;
      } catch (error) {
        console.error(`Error reading image ${imagePath}:`, error);
        throw error;
      }
    };

    console.log('Converting images to base64...');
    const mainImage = convertImageToBase64('Cook.jpg');
    const images = {
      '냉장고를 부탁해': convertImageToBase64('냉장고를 부탁해.webp'),
      '흑백요리사': convertImageToBase64('흑백요리사.webp'),
      '윤식당': convertImageToBase64('윤식당.webp'),
      '백종원의 골목식당': convertImageToBase64('백종원의 골목식당.jpeg')
    };

    // Debug: Log the data structure (without actual image data)
    const debugVoteData = {
      title: '요리 프로그램 인기 투표',
      type: 'TVSHOW',
      image: '[base64 image data]',
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          {
            name: '냉장고를 부탁해',
            description: '게스트의 냉장고 속 재료들을 이용한 1vs1 요리 대결',
            image: '[base64 image data]',
          },
          {
            name: '흑백요리사',
            description: '요리 서바이벌',
            image: '[base64 image data]',
          },
          {
            name: '윤식당',
            description: '가게 경영',
            image: '[base64 image data]',
          },
          {
            name: '백종원의 골목식당',
            description: '골목 상권 살리기',
            image: '[base64 image data]',
          }
        ]
      }
    };

    console.log('Data structure being used:', JSON.stringify(debugVoteData, null, 2));

    // Actual data for creation
    const voteData = {
      title: '요리 프로그램 인기 투표',
      type: 'TVSHOW',
      image: mainImage,
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          {
            name: '냉장고를 부탁해',
            description: '게스트의 냉장고 속 재료들을 이용한 1vs1 요리 대결',
            image: images['냉장고를 부탁해'],
          },
          {
            name: '흑백요리사',
            description: '요리 서바이벌',
            image: images['흑백요리사'],
          },
          {
            name: '윤식당',
            description: '가게 경영',
            image: images['윤식당'],
          },
          {
            name: '백종원의 골목식당',
            description: '골목 상권 살리기',
            image: images['백종원의 골목식당'],
          }
        ]
      }
    };

    console.log('Creating vote in database...');
    // Create the vote
    const vote = await prisma.vote.create({
      data: voteData,
      include: {
        items: true
      }
    });

    console.log('Successfully created vote with ID:', vote.id);
  } catch (error) {
    console.error('Error seeding database:', error);
    if (error.code === 'P2009') {
      console.error('Invalid Prisma schema - check if all required fields are provided');
    }
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    throw error;
  }
}

console.log('Starting database seed...');
main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Cleaning up...');
    await prisma.$disconnect();
  }); 