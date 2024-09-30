import { useNavigate } from '@remix-run/react';
import {
    IndexTable,
    Badge,
    useBreakpoints,
    Card,
    Thumbnail,
    Link,
    Button,
    EmptySearchResult,
} from '@shopify/polaris';
import { ImageMagicIcon } from '@shopify/polaris-icons';
import React from 'react';

function LinkedTable({ chartData, page, totalPages, pageSize }) {
    const navigate = useNavigate();
    const handleChangePage = (newPage) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', newPage);
        searchParams.set('pageSize', pageSize);
        navigate(`/app/linkedproducts?${searchParams.toString()}`);
    };

    const emptyStateMarkup = (
        <EmptySearchResult
            title={'No Size Chart Found'}
            description={`It looks like you don't have any size charts created yet. Please create a new size chart to get started`}
            withIllustration
        />
    );

    const resourceName = {
        singular: 'product',
        plural: 'products',
    };

    const HandleViewPreview = (link) => {
        if (link) {
            window.open(link, '_blank');
        }
    };


    const HandleEdit = (chart_id) => {
        if (chart_id) {
            navigate(`/app/createsizechart/edit_chart?chart_id=${chart_id}&from=user_chart`);
        }
    };

    const rowMarkup = chartData.map(
        (
            { id, status, name, type, collectionId, productTitle, productPreviewUrl, collectionTitle, productImage, productExId, collectionImage, storeSizeChartId },
            index,
        ) => (
            <IndexTable.Row id={id} key={id} position={index}>
                <IndexTable.Cell>
                    {type === 'Collection' ? (
                        <Thumbnail
                            source={collectionImage || ImageMagicIcon}
                            alt={collectionTitle || "Collection Image"}
                            size="small"
                        />
                    ) : type === 'Product' && productImage ? (
                        <Thumbnail
                            source={productImage}
                            alt={productTitle || "Product Image"}
                            size="small"
                        />
                    ) : null}
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Link monochrome url={`shopify://admin/${type === 'Collection' ? `collections/${collectionId}` : `products/${productExId}`}`}> {type === 'Collection' ? collectionTitle : productTitle}</Link>
                </IndexTable.Cell>
                <IndexTable.Cell> <Badge size="small" tone={status == 'draft' ? '' : 'success'}> {status == 'draft' ? 'Draft' : 'Active'}</Badge></IndexTable.Cell>
                <IndexTable.Cell>
                    {name}
                </IndexTable.Cell>
                <IndexTable.Cell><Badge size="small">{type}</Badge></IndexTable.Cell>
                <IndexTable.Cell><Button onClick={() => HandleEdit(storeSizeChartId)}>Edit chart</Button></IndexTable.Cell>
                <IndexTable.Cell><Button onClick={() => HandleViewPreview(productPreviewUrl)}>View chart</Button></IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    return (
        <Card roundedAbove='sm' padding={0}>
            <IndexTable
                condensed={useBreakpoints().smDown}
                resourceName={resourceName}
                itemCount={chartData.length}
                emptyState={emptyStateMarkup}
                headings={[
                    { title: '' },
                    { title: 'product', alignment: 'start' },
                    { title: 'Status' },
                    { title: 'Name' },
                    { title: 'Linked Via' },
                    { title: '  ' },
                    { title: ' ' },

                ]}
                selectable={false}
                pagination={{
                    hasNext: page < totalPages,
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

export default LinkedTable;
