import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSizeCategories } from "../models/sizeCategories.server";
import TemplatesPage from "../components/templatespage/TemplatesPage";
export const loader = async ({ request, params }) => {
    try {
        const categories = await getSizeCategories();
        const url = new URL(request.url);
        const from = url.searchParams.get("from");

        const transformedData = categories.map(item => ({
            id: item.id,
            content: item.name,
            panelID: item.name,
            accessibilityLabel: item.name,
            size_charts: item.PredefinedSizeChart,
        }));
        return json({ transformedData, from });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return json({ error: 'Unable to fetch categories' }, { status: 500 });
    }
};
function Templates() {
    const { transformedData, from } = useLoaderData();
    return <>
        <TemplatesPage categories={transformedData} from={from} />

    </>
}

export default Templates;
