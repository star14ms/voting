import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Deleting all VoteItemVote records...');
    await prisma.voteItemVote.deleteMany();
    
    console.log('Deleting all VoteItem records...');
    await prisma.voteItem.deleteMany();
    
    console.log('Deleting all Vote records...');
    await prisma.vote.deleteMany();
    
    console.log('All records deleted successfully!');
  } catch (error) {
    console.error('Error deleting records:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 