import db from "../db.server";

export async function UserSizeChartCreate(formValues, tableData, session, chartId) {
    try {
        const { name, status, rounding_mode,
            allow_converter, allow_converter_in,
            rounding_numOfDecimals, rounding_roundTo,
            content,
            image, category: { id },
            LinkedProducts, Linkedcollection
        } = formValues;

        const tableRespone = JSON.stringify(tableData);

        const storeSizeChart = await db.storeSizeChart.create({
            data: {
                name,
                ShopId: session.id,
                templateId: chartId,
                status,
                rounding_mode,
                allow_converter: allow_converter === 'true',
                allow_converter_in: Number(allow_converter_in),
                rounding_numOfDecimals: Number(rounding_numOfDecimals),
                rounding_roundTo: Number(rounding_roundTo),
                content,
                image: image ? image : '',
                user_chart_data: tableRespone, // Assuming tableData is the size chart data
            },
        });

        if (!storeSizeChart.error) {
            const { id } = storeSizeChart;

            const linkedProductsData = Array.isArray(LinkedProducts)
                ? LinkedProducts.map((product) => ({
                    productId: product.id,
                    productTitle: product.title,
                    storeId: session.id,
                    storeSizeChartId: id,
                }))
                : [];
            const linkedCollectionsData = Array.isArray(Linkedcollection)
                ? Linkedcollection.map((collection) => ({
                    collectionId: collection.id,
                    collectionTitle: collection.title,
                    storeId: session.id,
                    storeSizeChartId: id,
                }))
                : [];

            await db.linkedProduct.createMany({
                data: linkedProductsData,
            });

            await db.linkedCollection.createMany({
                data: linkedCollectionsData,
            });
        }
        return storeSizeChart

    } catch (error) {
        return { error: error.message };
    }
}


export async function UserSizeChartUpdate(formValues, tableData, session, chartId) {
    const { name, status, rounding_mode,
        allow_converter, allow_converter_in,
        rounding_numOfDecimals, rounding_roundTo,
        content,
        image, category: { id },
        LinkedProducts, Linkedcollection
    } = formValues;

    const tableRespone = JSON.stringify(tableData);

    const updatechart = await db.storeSizeChart.update({
        where: { id: chartId },
        data: {
            name,
            ShopId: session.id,
            status,
            rounding_mode,
            allow_converter: allow_converter === 'true',
            allow_converter_in: Number(allow_converter_in),
            rounding_numOfDecimals: Number(rounding_numOfDecimals),
            rounding_roundTo: Number(rounding_roundTo),
            content,
            image: image ? image : '',
            user_chart_data: tableRespone, // Assuming tableData is the size chart data
        },
    });

    if (!updatechart.error) {
        const { id } = updatechart;


        const linkedProductsData = Array.isArray(LinkedProducts)
            ? LinkedProducts.map((product) => ({
                productId: checkData(product.id) ? product.id : product.productId,
                productTitle: product.title || product.productTitle,
                storeId: session.id,
                storeSizeChartId: id,
            }))
            : [];
        const linkedCollectionsData = Array.isArray(Linkedcollection)
            ? Linkedcollection.map((collection) => ({
                collectionId: checkData(collection.id) ? collection.id : collection.collectionId,
                collectionTitle: collection.title || collection.collectionTitle,
                storeId: session.id,
                storeSizeChartId: id,
            }))
            : [];

        // Check if there are linked products to create
        if (linkedProductsData.length > 0) {
            await db.linkedProduct.deleteMany({
                where: {
                    storeSizeChartId: id,
                },
            });
            await db.linkedProduct.createMany({
                data: linkedProductsData,
            });
        }

        // Check if there are linked collections to create
        if (linkedCollectionsData.length > 0) {
            await db.linkedCollection.deleteMany({
                where: {
                    storeSizeChartId: id,
                },
            });
            await db.linkedCollection.createMany({
                data: linkedCollectionsData,
            });
        }


    }

    return updatechart;
}


function checkData(data) {
    if (data.includes('gid://shopify')) {
        return true; // If it contains, return true
    } else {
        return false; // You can replace "newData" with any desired value or logic
    }
}