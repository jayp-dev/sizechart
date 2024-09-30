
import db from '../db.server';
/**
 * Deletes size charts by an array of IDs for the provided session
 * @param {Object} session - The Shopify session object to validate ownership (if needed)
 * @param {Array<string>} ids - An array of size chart IDs to delete
 * @returns {Promise<void>}
 */
export async function deleteSizeCharts(session, ids) {
    try {
        const result = await db.storeSizeChart.deleteMany({
            where: {
                id: { in: ids }, // Deletes the size charts with IDs in the provided array
                ShopId: session.id, // Optional: If you want to scope deletion to a specific shop
            },
        });
        return result;
    } catch (error) {
        return { success: false, error: error.message, status: 500 };
    }
}


export async function updateSizeChartStatus(session, ids, newStatus) {
    try {
        const result = await db.storeSizeChart.updateMany({
            where: {
                id: {
                    in: ids,
                },
                ShopId: session.id,
            },
            data: {
                status: newStatus,
            },
        });
        return result;
    } catch (error) {
        return { success: false, error: error.message, status: 500 };
    }
}

