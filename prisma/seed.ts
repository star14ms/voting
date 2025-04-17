import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create celebrities
  await Promise.all([
    prisma.celebrity.create({
      data: {
        name: 'Tom Hanks',
        description: 'Academy Award-winning actor known for Forrest Gump and Cast Away',
        imageUrl: 'https://example.com/tom-hanks.jpg',
        updatedAt: new Date(),
      },
    }),
    prisma.celebrity.create({
      data: {
        name: 'Meryl Streep',
        description: 'Most nominated actor in Academy Award history',
        imageUrl: 'https://example.com/meryl-streep.jpg',
        updatedAt: new Date(),
      },
    }),
    prisma.celebrity.create({
      data: {
        name: 'Leonardo DiCaprio',
        description: 'Oscar-winning actor and environmental activist',
        imageUrl: 'https://example.com/leo.jpg',
        updatedAt: new Date(),
      },
    }),
  ])

  // Create TV shows
  await Promise.all([
    prisma.tVShow.create({
      data: {
        title: 'Breaking Bad',
        description: 'A high school chemistry teacher diagnosed with cancer turns to crime',
        imageUrl: 'https://example.com/breaking-bad.jpg',
        updatedAt: new Date(),
      },
    }),
    prisma.tVShow.create({
      data: {
        title: 'Game of Thrones',
        description: 'Epic fantasy series based on George R.R. Martin\'s novels',
        imageUrl: 'https://example.com/got.jpg',
        updatedAt: new Date(),
      },
    }),
    prisma.tVShow.create({
      data: {
        title: 'Friends',
        description: 'Classic sitcom about six friends living in New York City',
        imageUrl: 'https://example.com/friends.jpg',
        updatedAt: new Date(),
      },
    }),
  ])

  console.log('Seeded database with initial data')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 