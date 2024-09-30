import { json } from "@remix-run/node";

// routes/api/shopData.js
export const loader = async ({ request }) => {
    const shopDomain = new URL(request.url).searchParams.get("shop");
    return json({ shopDomain })
};
