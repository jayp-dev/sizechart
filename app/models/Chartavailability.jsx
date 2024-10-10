
import db from "../db.server";
import { FecthchartDetails } from "./SizeChartGet";
export async function Chartavailability(shop, productid, collectionids, application_url) {
    const collectionIdsArray = collectionids
        .split(',')
        .map(id => `gid://shopify/Collection/${parseInt(id, 10)}`);

    const session = await db.session.findMany({ where: { shop: shop } })
    if (session.length === 0) {
        return { error: 'Unable to proceed: The store information is missing or invalid.' };
    }

    const entryData = await ShopSettings(session);
    //find Linked product from the  Db
    const findLinkedProducts = await db.linkedProduct.findMany({ where: { storeId: session[0].id, productId: `gid://shopify/Product/${productid}` } })

    if (findLinkedProducts.length > 0) {
        const sizecharts = await FecthchartDetails(findLinkedProducts[0].storeSizeChartId)
        const { createdAt, updatedAt, ShopId, templateId, id, LinkedProduct, LinkedCollection, ...filteredSizeChart } = sizecharts.response[0];

        return {
            sizeGuideTitle: entryData.sizeGuideTitle,
            icon: `${application_url}/uploads/${entryData.icon.name}`,
            chart_exists: filteredSizeChart.status === 'active',
            customCss: entryData.customCss,
            SizePlacement: entryData.SizePlacement,
            headerColor: JSON.parse(entryData.headerColor),
            headerFontColor: JSON.parse(entryData.headerFontColor),
            zebraLinesColor: JSON.parse(entryData.zebraLinesColor),
            focusColor: JSON.parse(entryData.focusColor),
            borderStyle: entryData.borderStyle,
            SizechartPro: filteredSizeChart

        }
        // return sizecharts;
    }

    //find Linked collection from the  Db
    const findLinkedCollections = await db.linkedCollection.findMany({
        where: {
            storeId: session[0].id,
            collectionId: {
                in: collectionIdsArray, // Use the `in` operator to match any of the IDs
            },
        },
    });

    if (findLinkedCollections.length > 0) {
        // return findLinkedCollections
        const sizecharts = await FecthchartDetails(findLinkedProducts[0].storeSizeChartId)
        const { createdAt, updatedAt, ShopId, templateId, id, LinkedProduct, LinkedCollection, ...filteredSizeChart } = sizecharts.response[0];

        return {
            sizeGuideTitle: entryData.sizeGuideTitle,
            icon: `${application_url}/uploads/${entryData.icon.name}`,
            chart_exists: filteredSizeChart.status === 'active',
            customCss: entryData.customCss,
            SizePlacement: entryData.SizePlacement,
            headerColor: JSON.parse(entryData.headerColor),
            headerFontColor: JSON.parse(entryData.headerFontColor),
            zebraLinesColor: JSON.parse(entryData.zebraLinesColor),
            focusColor: JSON.parse(entryData.focusColor),
            borderStyle: entryData.borderStyle,
            SizechartPro: filteredSizeChart


        }
    }

    return {
        error: true,
        chart_exists: false,
        message: 'Unable to proceed: The store information is missing or invalid. Please verify the shop URL and try again.'
    }
}


//Get shop settings for the chart styles
async function ShopSettings(session) {
    const response = await db.shopSettings.findUnique({
        where: { ShopId: session[0].id },
        include: {
            icon: true
        }
    })
    return response;
}

