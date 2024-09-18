
import db from "../db.server";

export async function getSizeCategories() {
  const categories = await db.sizeCategory.findMany({
    include: {
      PredefinedSizeChart: true // Assuming `chart` is the relation name in your Prisma schema
    }
  });
  if (!categories) {
    return null;
  }
   return categories;

}

export async function getSinglecategory(id) {
   const category = await db.sizeCategory.findFirst({where:{id}});
   if (!category) {
    return null;
  }
   return category;
}


export function validateFields(data) {
  const errors = {};
    if (!data.name) {
      errors.name = "name is required";
    }
  if (Object.keys(errors).length) {
    return errors;
  }

}