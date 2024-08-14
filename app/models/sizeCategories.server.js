
import db from "../db.server";

export async function getSizeCategories() {
  const categories = await db.sizeCategory.findMany();
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

    if(!data.sessionId) {
      errors.shop = "Shop is not Valid"
    }

  if (Object.keys(errors).length) {
    return errors;
  }

}