
import db from "../db.server";
export async function fetchOtherSizeChartProducts(session) {
    try {
        const response = await db.linkedProduct.findMany({ where: { storeId: session.id } });
        if (!response.error) {
            return response
        }
        return []
    } catch (error) {

    }
}

export async function fetchOtherSizeChartCollections(session) {
    try {
        const response = await db.linkedCollection.findMany({ where: { storeId: session.id } });
        if (!response.error) {
            return response
        }
        return []
    } catch (error) {

    }
}