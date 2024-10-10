

import { Box, Page, Text } from "@shopify/polaris";
import {
    useLoaderData, useNavigate, isRouteErrorResponse,
    useRouteError,
    json,
    useFetcher,
} from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { DashboardSizeCharts } from "../models/SizeChartGet";
import { ErrorMessage } from "../components/ErrorMessage";
import { useCallback, useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable";
import { Modal, TitleBar, useAppBridge } from '@shopify/app-bridge-react';
import { deleteSizeCharts, updateSizeChartStatus } from "../models/deleteSizeCharts";
import LoadingSvg from "../components/LoadingSvg";

// Loader function
export const loader = async ({ request, params }) => {
    const { session } = await authenticate.admin(request);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const pageSize = parseInt(url.searchParams.get("pageSize")) || 15;
    try {
        const sizecharts = await DashboardSizeCharts(session, page, pageSize);
        return json({ sizecharts, page, pageSize });
    } catch (error) {
        throw new Response("Failed to load data", { status: 500 });
    }
};

// Action function
export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const idsToProcess = JSON.parse(formData.get("idsToProcess") || "[]");
    const actionType = formData.get("actionType");
    const newStatus = formData.get("newStatus");

    try {
        if (actionType === 'delete') {
            const response = await deleteSizeCharts(session, idsToProcess);
            if (!response.error) {
                return json({ response, success: true, message: 'Chart deleted SuccessFully' })
            }
        } else if (actionType === 'update' && newStatus) {
            const response = await updateSizeChartStatus(session, idsToProcess, newStatus);
            if (!response.error) {
                return json({ response, success: true, message: 'Status  updated SuccessFully' })
            }
        }
        return json({ idsToProcess, actionType, newStatus })
    } catch (error) {
        return json({ error: `Failed to ${actionType} size charts` }, { status: 500 });
    }
}

function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { sizecharts, page, pageSize } = useLoaderData();
    const totalPages = sizecharts.totalItems;
    const [chartData, setChartData] = useState(sizecharts.response || []);
    const [deletedids, setDeletedids] = useState([]);
    const [modalType, setModalType] = useState(""); // 'single' or 'bulk'
    const [newStatus, setNewStatus] = useState(''); // Default status
    const fetcher = useFetcher(); // Use fetcher for actions (like form submission)
    const [isActiveModelErr, setisActiveModalErr] = useState(false);
    const [activeMessage, setActiveMesage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const createHandle = async () => {
        setLoading(true);
        navigate("/app/templates?from=linked_products", { replace: true });
    };

    const ViewProducts = async () => {
        setLoading(true);
        navigate("/app/linkedproducts?from=linked_products", { replace: true });
    };

    const shopify = useAppBridge();
    useEffect(() => {
        const data = sizecharts.response;
        setChartData(data);
    }, [sizecharts]);


    const handleBulkAction = async (actionType) => {
        fetcher.submit(
            { idsToProcess: JSON.stringify(deletedids), actionType, newStatus },
            { method: "post", action: "/app/dashboard" }
        );
        setDeletedids([]); // Clear the list after action

    };

    const handleModalConfirm = () => {
        if (!isActiveModelErr) {
            handleBulkAction(modalType);
        }
        shopify.modal.hide('my-modal')
    };

    const setModalActive = useCallback((id, type) => {
        if (id) {
            setModalType(type);
            shopify.modal.show("my-modal");
            setDeletedids([id]);
        }
    }, [shopify]);

    useEffect(() => {
        if (fetcher?.data?.success) {
            setShowToast(true);
        }
    }, [fetcher]);

    useEffect(() => {
        if (showToast) {
            shopify.toast.show(fetcher?.data?.message, {
                duration: 3000,
                onDismiss: () => { }
            });
            setShowToast(false);
        }
    }, [showToast, shopify, fetcher]);

    if (loading) {
        return <LoadingSvg />;
    }
    return (
        <Page
            title={"Your personalized size charts 😊"}
            subtitle="Here’s a comprehensive list of all the size charts you’ve created."
            primaryAction={{
                content: "Create size chart",
                disabled: false,
                onAction: createHandle,
            }}
            secondaryActions={[
                { content: "View Products", onAction: ViewProducts },
            ]}
        >
            <Modal id="my-modal">
                <Box padding={400}>
                    <Text as="h2" variant="bodySm">
                        {isActiveModelErr === true ? activeMessage :
                            newStatus === 'draft'
                                ? 'The selected size charts will be unpublished and hidden from your store.'
                                : newStatus === 'active'
                                    ? 'The selected size charts will be published and visible in your store.'
                                    : modalType === 'delete'
                                        ? 'This action will permanently delete the selected size charts and cannot be undone.'
                                        : ''}

                    </Text>
                </Box>
                <TitleBar title={isActiveModelErr === true
                    ? 'Warning'
                    : newStatus === 'draft'
                        ? 'Set size charts as draft?'
                        : newStatus === 'active'
                            ? 'Set size charts as active?'
                            : modalType === 'delete'
                                ? 'Delete selected size charts?'
                                : ''}>
                    <button
                        variant="primary"
                        tone={newStatus === 'draft'
                            ? 'default'
                            : newStatus === 'active'
                                ? 'default'
                                : modalType === 'delete'
                                    ? 'critical'
                                    : 'default'}
                        onClick={handleModalConfirm}
                    >
                        {isActiveModelErr === true
                            ? 'Ok'
                            : newStatus === 'draft'
                                ? 'Set as draft'
                                : newStatus === 'active'
                                    ? 'Set as active'
                                    : modalType === 'delete'
                                        ? 'Delete'
                                        : ''}

                    </button>
                    {!isActiveModelErr && (
                        <button onClick={() => shopify.modal.hide("my-modal")}>
                            Cancel
                        </button>
                    )}
                </TitleBar>
            </Modal>

            {
                !sizecharts.error ? (
                    <DashboardTable
                        chartData={chartData}
                        page={page}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        onDelete={(ids, type, status) => {
                            setNewStatus(status)
                            setDeletedids(ids);
                            setModalType(type);
                            setisActiveModalErr(false)
                            shopify.modal.show("my-modal");
                        }}
                        setModalActive={setModalActive}
                        setisActiveModalErr={setisActiveModalErr}
                        setActiveMesage={setActiveMesage}
                        ResetMethod={showToast}
                        setLoading={setLoading}
                    />
                ) : (
                    <ErrorMessage title="No Data" description={sizecharts.error} />
                )
            }
        </Page >
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <ErrorMessage
                title={`Error ${error.status}`}
                description={
                    error.data || error.statusText || "There was an issue loading the data."
                }
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

export default Dashboard;
