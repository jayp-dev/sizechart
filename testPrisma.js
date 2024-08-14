import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    // Test finding categories
    const categories = await prisma.welcomeScreen.findMany();
    console.log('Categories:', categories);

    const newWelcomeScreen = await prisma.welcomeScreen.create({
      data: {
        EmbedApp: true,
        GettingStart: false,
        sessionId: 'offline_gifting4.myshopify.com', // Ensure this sessionId exists in Session table
      },
    });

    console.log('newWelcomeScreen:', newWelcomeScreen);

    const welcomeScreenWithSession = await prisma.welcomeScreen.findUnique({
      where: { id: 1 },
      include: { session: true },
    });
    console.log('welcomeScreenWithSession', welcomeScreenWithSession)

    // Test creating a category
    // const newCategory = await prisma.welcomeScreen.create({
    //   data: { name: 'Test Category' },
    // });
    // console.log('New Category:', newCategory);

    // // Optionally, you can also test updating and deleting
    // // Update a category
    // const updatedCategory = await prisma.sizeCategory.update({
    //   where: { id: newCategory.id },
    //   data: { name: 'Updated Category Name' },
    // });
    // console.log('Updated Category:', updatedCategory);

    // // Delete a category
    // const deletedCategory = await prisma.sizeCategory.delete({
    //   where: { id: newCategory.id },
    // });
    // console.log('Deleted Category:', deletedCategory);

  } catch (error) {
    console.error('Prisma error:', error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects from the database
  }
}

testPrisma();
