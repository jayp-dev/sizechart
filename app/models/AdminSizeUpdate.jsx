import db from "../db.server"
export async function AdminSizeUpdate(formValues, tableData, session, chartId) {
    try {
        const { name, status, rounding_mode,
            allow_converter, allow_converter_in,
            rounding_numOfDecimals, rounding_roundTo,
            content,
            image, category: { id },
            LinkedProducts, Linkedcollection
        } = formValues;

        const tableRespone = JSON.stringify(tableData);
        const response = db.predefinedSizeChart.update({
            where: { id: chartId },
            data: {
                name,
                status,
                allow_converter: allow_converter === 'true' ? true : false,
                rounding_mode,
                allow_converter_in: Number(allow_converter_in),
                rounding_numOfDecimals: Number(rounding_numOfDecimals),
                rounding_roundTo: Number(rounding_roundTo),
                content,
                image: image ? image : '',
                sizeCategoryId: id,
                user_chart_data: tableRespone,
            }
        })

        if (!response.error) {
            return response;
        }
    } catch (error) {
        return { error: error.message };
    }
}