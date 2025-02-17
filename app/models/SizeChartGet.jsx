
import db from "../db.server";
export async function PredefinedSizeChartGet(session, admin, chartId, from) {
    try {
        const response = await db.predefinedSizeChart.findMany({ where: { id: chartId } });
        if (!response.error) {
            return { status: 200, success: true, response: response }
        }
        return { error: 'chart not found', status: 500, success: false }
    } catch (error) {
        return { error: error.message };
    }
}

export async function DashboardSizeCharts(session, page, pageSize) {
    try {
        const pageData = page; // Ensure page is at least 1
        const pageSizeData = pageSize; // Define the number of records per page

        const response = await db.storeSizeChart.findMany({
            where: {
                ShopId: session.id, // Ensure session.id is correct
            },
            include: {
                LinkedProduct: true, // Include related products
                LinkedCollection: true, // Include related collections
            },
            skip: (pageData - 1) * pageSizeData, // Correct pagination logic
            take: pageSizeData,
        });


        const totalItems = await db.storeSizeChart.count({ where: { ShopId: session.id } });
        if (!response.error) {

            const extractedItem = response.map(item => ({
                id: item.id,
                name: item.name,
                ShopId: item.ShopId,
                templateId: item.templateId,
                status: item.status,
                LinkedProduct: item.LinkedProduct.length,
                LinkedCollection: item.LinkedCollection.length,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }));
            return { status: 200, success: true, response: extractedItem, totalItems }
        }
        return { error: 'Charts not found', status: 500, success: false }
    } catch (error) {
        return { error: error.message };
    }
}

export async function StoreSizeChartGet(session, admin, chartId, from) {
    try {
        const response = await db.storeSizeChart.findMany({
            where: { id: chartId },
            include: {
                LinkedProduct: true, // Include the related products for each order
                LinkedCollection: true,
            },
        });
        if (!response.error) {
            const originalData = response;
            const newLinkedProduct = originalData[0]?.LinkedProduct || [];
            const newLinkedCollection = originalData[0]?.LinkedCollection || [];

            const enhancedData = await Promise.all(
                newLinkedProduct.map(async (item) => {
                    const productDetails = await fetchProductDetails(item.productId, admin);
                    return {
                        ...item,
                        id: productDetails?.id,
                        title: productDetails?.title,
                        imageSrc: productDetails?.image,
                        productImageAltText: productDetails?.imageAltText
                    };
                })
            );

            // Fetch collection details and update LinkedCollection
            const enhancedCollections = await Promise.all(
                newLinkedCollection.map(async (item) => {
                    const collectionDetails = await fetchCollectionDetails(item.collectionId, admin);
                    return {
                        ...item,
                        id: collectionDetails.id,
                        title: collectionDetails.title,
                        handle: collectionDetails.handle,
                        updatedAt: collectionDetails.updatedAt,
                        imageSrc: collectionDetails.image,
                        alt: collectionDetails.imageAltText
                    };
                })
            );

            const updatedData = {
                ...originalData[0],
                LinkedProduct: enhancedData, // Update LinkedProduct with new data
                LinkedCollection: enhancedCollections
            };

            return { status: 200, success: true, response: updatedData }
        }
        return { error: 'chart not found', status: 500, success: false }
    } catch (error) {
        return { error: error.message };
    }
}

export async function ShopSizeCharts(session, admin, page, pageSize) {
    try {
        // const shop
        const response = await db.storeSizeChart.findMany({
            where: { ShopId: session.id },
            include: {
                LinkedProduct: true, // Include the related products for each order
                LinkedCollection: true,
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        const totalItems = await db.storeSizeChart.count();
        if (!response.error) {
            const data = response;
            const formattedData = data.flatMap(item => {
                const { id, status, name, LinkedProduct, LinkedCollection } = item;
                const products = LinkedProduct.map(lp => ({ id, status, name, type: 'Product', ...lp }));
                const collections = LinkedCollection.map(lc => ({ id, status, name, type: 'Collection', ...lc }));
                return [...products, ...collections];
            });
            const shop = session.shop;
            const enhancedData = await enhanceDataWithProductDetails(formattedData, admin, shop);

            return { status: 200, success: true, response: enhancedData, totalItems }
        }
        return { error: 'Charts not found in your store Please create chart first', status: 500, success: false }
    } catch (error) {
        return { error: error.message };
    }

}

async function enhanceDataWithProductDetails(existingData, admin, shop) {
    const enhancedData = await Promise.all(
        existingData.map(async (item) => {
            if (item.type === "Product") {
                const productDetails = await fetchProductDetails(item.productId, admin);
                return {
                    ...item,
                    productPreviewUrl: `https://${shop}/products/${productDetails.handle}`,
                    productExId: productDetails.id,
                    productTitle: productDetails.title,
                    productImage: productDetails.image,
                    productImageAltText: productDetails.imageAltText
                };
            } else if (item.type === "Collection") {
                // Fetch collection details
                const collectionDetails = await fetchCollectionDetails(item.collectionId, admin);
                return {
                    ...item,
                    productPreviewUrl: `https://${shop}/collections/${collectionDetails.handle}`,
                    collectionId: collectionDetails.id,
                    collectionTitle: collectionDetails.title,
                    collectionHandle: collectionDetails.handle,
                    collectionUpdatedAt: collectionDetails.updatedAt,
                    collectionImage: collectionDetails.image,
                    collectionImageAltText: collectionDetails.imageAltText
                };
            }
            return item;

        })
    );

    return enhancedData;
}
async function fetchProductDetails(productId, admin) {
    const response = await admin.graphql(
        `#graphql
      query {
        product(id: "${productId}") {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
        }
      }`,
    );

    const data = await response.json();
    const product = data.data.product;

    return {
        id: product.id.replace("gid://shopify/Product/", ""),
        title: product.title,
        handle: product.handle,
        image: product.images.edges.length > 0 ? product.images.edges[0].node.originalSrc : null,
        imageAltText: product.images.edges.length > 0 ? product.images.edges[0].node.altText : null,
    };
}


async function fetchCollectionDetails(collectionId, admin) {

    const response = await admin.graphql(
        `#graphql
      query {
        collection(id: "${collectionId}") {
          id
          title
          handle
          updatedAt
          image {
            originalSrc
            altText
          }
        }
      }`,
    );

    const data = await response.json();
    const collection = data.data.collection;
    return {
        id: collection.id.replace("gid://shopify/Collection/", ""),
        title: collection.title,
        handle: collection.handle,
        updatedAt: collection.updatedAt,
        image: collection.image ? collection.image.originalSrc : null,
        imageAltText: collection.image ? collection.image.altText : null,
    };

}

export async function FecthchartDetails(chartId) {
    try {
        const response = await db.storeSizeChart.findMany({
            where: { id: chartId },
            include: {
                LinkedProduct: true, // Include the related products for each order
                LinkedCollection: true,
            },
        });
        if (!response.error) {
            return { status: 200, success: true, response }
        }
        return { error: 'chart not found', status: 500, success: false }
    } catch (error) {
        return { error: error.message };
    }
}