import db from "../db.server"
export async function PredefinedSize(formValues, tableData, session, iconName) {
    try {
        const { name, status, rounding_mode,
            allow_converter, allow_converter_in,
            rounding_numOfDecimals, rounding_roundTo,
            content,
            image, category: { id },
            LinkedProducts, Linkedcollection
        } = formValues;
        const tableRespone = JSON.stringify(tableData);
        const response = await db.predefinedSizeChart.create({
            data: {
                name,
                status,
                allow_converter: allow_converter === 'true' ? true : false,
                rounding_mode,
                allow_converter_in: Number(allow_converter_in),
                rounding_numOfDecimals: Number(rounding_numOfDecimals),
                rounding_roundTo: Number(rounding_roundTo),
                content,
                icon: iconName || '',
                image: image ? image : '',
                sizeCategoryId: id,
                user_chart_data: tableRespone,
            }
        })

        if (response != null) {
            const { id } = response;
            const storeSizeChart = await db.storeSizeChart.create({
                data: {
                    name,
                    ShopId: session.id,
                    templateId: id,
                    status,
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
                const linkedProductsData = LinkedProducts.map((product) => ({
                    productId: product.id,
                    productTitle: product.title,
                    storeId: session.id,
                    storeSizeChartId: id,
                }));

                const linkedCollectionsData = Linkedcollection.map((collection) => ({
                    collectionId: collection.id,
                    collectionTitle: collection.title,
                    storeId: session.id,
                    storeSizeChartId: id,
                }));

                // Check if there are linked products to create
                if (linkedProductsData.length > 0) {
                    await db.linkedProduct.createMany({
                        data: linkedProductsData,
                    });
                }

                // Check if there are linked collections to create
                if (linkedCollectionsData.length > 0) {
                    await db.linkedCollection.createMany({
                        data: linkedCollectionsData,
                    });
                }

            }

            return storeSizeChart
        }
        return response;
    } catch (error) {
        console.error("Error performing action:", error);
        return { error: error.message };
    }

} 