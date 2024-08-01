// // app/routes/templates.jsx or .tsx
// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import TemplatesPage from "../components/templatespage/TemplatesPage";

// export const loader = async () => {
//     const API_ENDPOINT = process.env.API_ENDPOINT;
//     if (!API_ENDPOINT) {
//         throw new Error("API_ENDPOINT is not defined");
//     }

//     const response = await fetch(`${API_ENDPOINT}/api/v1/categories`);
//     if (!response.ok) {
//         throw new Error("Failed to fetch categories");
//     }

//     const data = await response.json();
//     const transformedData = data.data.map(item => ({
//         id: item.id,
//         content: item.name,
//         panelID: item.name,
//         accessibilityLabel: item.name,
//         size_charts: item.size_charts,
//     }));


//     return json({ transformedData, API_ENDPOINT });
// };

// function Templates() {
//     const { transformedData, API_ENDPOINT } = useLoaderData(); // loader returns data directly, no need to destructure
//     return <>
//         <TemplatesPage categories={transformedData} API_ENDPOINT={API_ENDPOINT} />

//     </>
// }

// export default Templates;



import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSizeCategories } from "../models/sizeCategories.server";
import TemplatesPage from "../components/templatespage/TemplatesPage";
export const loader = async () => {
    try {
        const categories = await getSizeCategories();

        const transformedData = categories.map(item => ({
            id: item.id,
            content: item.name,
            panelID: item.name,
            accessibilityLabel: item.name,
            size_charts: [],
        }));
        return json({ transformedData });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return json({ error: 'Unable to fetch categories' }, { status: 500 });
    }
};
function Templates() {
    const { transformedData } = useLoaderData();

    return <>
        <TemplatesPage categories={transformedData} />

    </>
}

export default Templates;
