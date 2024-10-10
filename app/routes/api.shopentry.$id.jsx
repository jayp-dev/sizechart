import { json } from "@remix-run/node"
import { Chartavailability } from "../models/Chartavailability";


export const loader = async ({ request, params }) => {
    const application_url = process.env.SHOPIFY_APP_URL || "";
    const url = new URL(request.url);
    const shop = params.id;
    const productid = url.searchParams.get('product') || '';
    const collectionids = url.searchParams.get('collections') || '';
    const chartAvailablity = await Chartavailability(shop, productid, collectionids, application_url);


    if (!productid && !collectionids)
        return json({ status: 'error', message: 'Unable to proceed: The store information is missing or invalid. Please verify the shop URL and try again.' }, { status: 400 })
    if (!shop) {
        return json({ status: 'error', message: 'Unable to proceed: The store information is missing or invalid. Please verify the shop URL and try again.' }, { status: 400 })
    }
    if (!chartAvailablity.error) {
        return json(
            { status: 'success', message: 'Size chart found successfully for the specified product in the store', size: chartAvailablity },
            { status: 200 }
        )
    }
    return json({ status: 'error', size: { chart_exists: chartAvailablity.chart_exists, message: chartAvailablity.message } })
}




// // https://salaries-favorites-classic-concrete.trycloudflare.com/api/shopentry/chhavi-batnagar.myshopify.com?product=9080695947566&collections=504837308718,462489157934