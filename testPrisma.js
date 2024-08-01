import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    // Test finding categories
    const categories = await prisma.sizeCategory.findMany();
    console.log('Categories:', categories);

    // Test creating a category
    const newCategory = await prisma.sizeCategory.create({
      data: { name: 'Test Category' },
    });
    console.log('New Category:', newCategory);

    // Optionally, you can also test updating and deleting
    // Update a category
    const updatedCategory = await prisma.sizeCategory.update({
      where: { id: newCategory.id },
      data: { name: 'Updated Category Name' },
    });
    console.log('Updated Category:', updatedCategory);

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
