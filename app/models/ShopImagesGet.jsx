import db from "../db.server";
export async function ShopImagesGet(session, admin) {
    try {
        const response = await db.shopImages.findMany({ where: { ShopId: session.id } });

        if (response.length > 0) {
            const images = JSON.parse(response[0].images);
            const imageData = await fetchImageUrls(images, admin);
            return imageData;
        } else {
            console.error("No images found for this session.");
            return [];
        }
    } catch (error) {
        console.error("Error performing action:", error);
        return { error: error.message };
    }
}

const fetchImageUrls = async (imageIds, admin) => {
    try {
        const imagePromises = imageIds.map(async ({ id }) => {
            const response = await admin.graphql(
                `#graphql
        query {
          node(id: "${id}") {
            id
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }`
            );

            const result = await response.json();
            const imageUrl = result.data.node?.image?.url;

            if (imageUrl) {
                return { id, url: imageUrl };
            } else {
                console.error(`No image URL found for id: ${id}`);
                return null;
            }
        });

        // Execute all requests in parallel and filter out null values
        const imageData = (await Promise.all(imagePromises)).filter(data => data !== null);
        return imageData;
    } catch (error) {
        console.error("Error fetching image URLs:", error);
        return [];
    }
};



