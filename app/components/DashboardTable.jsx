import { useNavigate } from '@remix-run/react';
import {
    IndexTable,
    useIndexResourceState,
    Text,
    Badge,
    useBreakpoints,
    Card,
    InlineStack,
    Button,
} from '@shopify/polaris';

import {
    EditIcon, DeleteIcon
} from '@shopify/polaris-icons';
import React, { useEffect } from 'react';

function DashboardTable({ chartData, page, pageSize, totalPages, ResetMethod, onDelete, setModalActive, setisActiveModalErr, setActiveMesage }) {
    const navigate = useNavigate();
    const resourceName = {
        singular: 'Size chart',
        plural: 'Size charts',
    };

    const totalPage = Math.ceil(totalPages / pageSize)
    const handleChangePage = (newPage) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', newPage);
        searchParams.set('pageSize', pageSize);
        navigate(`/app/dashboard?${searchParams.toString()}`);
    };


    const HandleEdit = (chart_id) => {
        if (chart_id) {
            navigate(`/app/createsizechart/edit_chart?chart_id=${chart_id}&from=user_chart`);
        }
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
        useIndexResourceState(chartData);

    useEffect(() => {
        if (ResetMethod == true) {
            clearSelection();
        }
    }, [clearSelection, ResetMethod])


    const rowMarkup = chartData.map(
        (
            { id, name, status, LinkedProduct, LinkedCollection, updatedAt, ShopId },
            index,
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
                onClick={() => null}
            >
                <IndexTable.Cell>
                    <Text variant="headingXs" as="h6">
                        {name}
                    </Text>

                </IndexTable.Cell>
                <IndexTable.Cell><Badge size="small" tone={status == 'draft' ? '' : 'success'}>
                    {status == 'draft' ? 'Draft' : 'Active'}
                </Badge></IndexTable.Cell>
                <IndexTable.Cell>
                    Size chart
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <InlineStack gap={400}>
                        {LinkedProduct > 0 && (
                            <Text as="span" alignment="end" numeric>
                                <Badge size="small" tone="attention">
                                    {LinkedProduct} {LinkedProduct > 1 ? 'Products' : 'Product'}
                                </Badge>

                            </Text>
                        )}
                        {LinkedCollection > 0 && (
                            <Text as="span" alignment="end" numeric>
                                <Badge size="small" tone="attention">
                                    {LinkedCollection} {LinkedCollection > 1 ? 'Collections' : 'Collection'}
                                </Badge>

                            </Text>
                        )}

                    </InlineStack>


                </IndexTable.Cell>

                <IndexTable.Cell> <Text as="span" alignment="end" numeric>{new Date(updatedAt).toDateString()}</Text></IndexTable.Cell>

                <IndexTable.Cell>
                    <Button icon={DeleteIcon} variant="monochromePlain" onClick={() => setModalActive(id, 'delete')} />
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Button icon={EditIcon} variant="monochromePlain" onClick={() => HandleEdit(id)} />
                </IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    const promotedBulkActions = [
        {
            content: 'Delete',
            destructive: true,
            onAction: () => {
                if (selectedResources.length > 0) {
                    onDelete(selectedResources, 'delete', '');  // Call the delete function with selected resources
                }
            },
        },
        {
            content: 'Set as active',
            onAction: () => {
                if (selectedResources.length > 0) {
                    onDelete(selectedResources, 'update', 'active');
                    const selectedCharts = chartData.filter(chart => selectedResources.includes(chart.id));
                    const hasErrors = selectedCharts.some((chart) => {
                        const hasLinkedProducts = chart.LinkedProduct > 0;
                        const hasLinkedCollections = chart.LinkedCollection > 0;

                        if (!hasLinkedProducts && !hasLinkedCollections) {
                            setActiveMesage(`Size chart "${chart.name}" will not be activated. Size charts must be linked to at least one product or collection before being activated.`);
                            return true; // Indicates an error for this chart
                        }

                        return false; // No error for this chart
                    });
                    // If there are any errors, set the error modal state
                    if (hasErrors) {
                        setisActiveModalErr(true);
                    } else {
                        setisActiveModalErr(false);
                        onDelete(selectedResources, 'update', 'active'); // Proceed with activation if no errors
                    }
                }
            }
        },
        {
            content: 'Set as draft',
            onAction: () => {
                if (selectedResources.length > 0) {
                    setisActiveModalErr(false)
                    onDelete(selectedResources, 'update', 'draft');
                    // Call the delete function with selected resources
                }
            }
        },
    ];
    return (
        <Card padding={0}>
            <IndexTable
                condensed={useBreakpoints().smDown}
                resourceName={resourceName}
                itemCount={chartData.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}

                promotedBulkActions={promotedBulkActions}
                headings={[
                    { title: 'Name' },
                    { title: 'Status' },
                    { title: 'Type' },
                    { title: 'Linked', alignment: 'center' },
                    { title: 'Last Updateed', alignment: "end" },
                    { title: ' ', alignment: "end" },
                    { title: '', alignment: "end" },

                ]}
                pagination={{
                    hasNext: page < totalPage,
                    hasPrevious: page > 1,
                    onPrevious: () => handleChangePage(page - 1),
                    onNext: () => { handleChangePage(page + 1) },
                }}
            >
                {rowMarkup}
            </IndexTable>
        </Card>
    );
}


export default DashboardTable;