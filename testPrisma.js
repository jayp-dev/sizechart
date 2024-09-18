import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    // Test finding categories
    // const categories = await prisma.welcomeScreen.findMany();
    // console.log('Categories:', categories);

    // const newWelcomeScreen = await prisma.welcomeScreen.create({
    //   data: {
    //     EmbedApp: true,
    //     GettingStart: false,
    //     sessionId: 'offline_gifting4.myshopify.com', // Ensure this sessionId exists in Session table
    //   },
    // });

    // console.log('newWelcomeScreen:', newWelcomeScreen);

    // const welcomeScreenWithSession = await prisma.welcomeScreen.findUnique({
    //   where: { id: 1 },
    //   include: { session: true },
    // });
    // console.log('welcomeScreenWithSession', welcomeScreenWithSession)

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

  //   const existingRecord = await prisma.shopImages.findUnique({
  //     where: { ShopId: 'offline_gifting4.myshopify.com' }
  // });


  const response = await prisma.predefinedSizeChart.create({
    data: {
      sizeCategoryId:3,
       name: "JAY p Rajput",
        status: "draft",
        rounding_mode: "auto",
        rounding_numOfDecimals: 1,
        rounding_roundTo: 0.1,
        content: "<p style=\"text-align: left;\"><strong>BUST</strong></p>\n<p style=\"text-align: left;\">Measure around the fullest part of your bust, keeping the tape measure horizontal.</p>\n<p><span style=\"color: #000000;\"><strong>WAIST</strong></span></p>\n<p>Wrap the measuring tape around your torso at the smallest part of your waist. Typically this is an inch or so above your belly button and is also known as the natural waistline.</p>\n<p><span style=\"color: #000000;\"><strong>HIPS</strong></span></p>\n<p>Wrap the measuring tape around the widest part of the seat.</p>",

    }
})
  console.log('existingRecord', response)
  } catch (error) {
    console.error('Prisma error:', error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects from the database
  }
}

testPrisma();
