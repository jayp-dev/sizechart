import { json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { Box, Page } from "@shopify/polaris";
import { DataTableIcon } from "@shopify/polaris-icons";
import {
    useLoaderData, useNavigate, isRouteErrorResponse,
    useRouteError,
} from "@remix-run/react";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingState } from "../components/LoadingState";
import LinkedTable from "../components/LinkedTable";
import { ShopSizeCharts } from "../models/SizeChartGet";
import { authenticate } from "../shopify.server";
import { useEffect, useState } from "react";

export const loader = async ({ request, params }) => {
    const { session, admin } = await authenticate.admin(request);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const pageSize = parseInt(url.searchParams.get("pageSize")) || 15;

    try {
        const sizecharts = await ShopSizeCharts(session, admin, page, pageSize)
        return json({ sizecharts, page, pageSize });
    } catch (error) {
        throw new Response("Failed to load data", { status: 500 });
    }
};

function LinkedProducts() {
    const navigate = useNavigate();
    const { sizecharts, page, pageSize } = useLoaderData();
    const totalPages = sizecharts.totalPages;
    const [chartData, setChartData] = useState([])
    const createHandle = async () => {
        navigate("/app/templates?from=linked_products");
    };

    const Viewsizecharts = async () => {
        navigate("/app/dashboard");
    };

    useEffect(() => {
        const data = sizecharts.response;
        setChartData(data);
    }, [sizecharts]);

    if (!sizecharts) {
        return <LoadingState />;
    }
    return (
        <Page
            title={"Here are the products that are linked to your size charts."}
            primaryAction={{
                content: "Create size chart",
                disabled: false,
                onAction: createHandle,
            }}
            secondaryActions={[{ content: "View size charts", icon: DataTableIcon, onAction: Viewsizecharts }]}
        >
            {!sizecharts.error ? (
                <Box paddingBlockEnd={400}>
                    <LinkedTable chartData={chartData} page={page} pageSize={pageSize} totalPages={totalPages} />
                </Box>
            ) : (
                <ErrorMessage title="No Data" description={sizecharts.error} />
            )}
        </Page>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    console.log(error)
    if (isRouteErrorResponse(error)) {
        return (
            <ErrorMessage
                title={`Error ${error.status}`}
                description={error.data || error.statusText || "There was an issue loading the data."}
            />
        );
    } else if (error instanceof Error) {
        return (
            <ErrorMessage
                title="Unexpected Error"
                description={error.message || "An unexpected error occurred. Please try again."}
            />
        );
    } else {
        return <ErrorMessage title="Unknown Error" description="An unknown error occurred." />;
    }
}
export default LinkedProducts;
