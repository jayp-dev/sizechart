import { Box, Card, EmptySearchResult, IndexTable, Thumbnail } from "@shopify/polaris";
import { useCallback, useState } from "react";

function ShowLinkedItems({ linkedProducts, linkedCollections }) {
    // Combine products and collections
    console.log(linkedCollections, linkedProducts)
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Number of items per page
    const combinedData = [
        ...linkedProducts.map(product => ({
            id: product.id,
            title: product.title || product.productTitle,
            type: 'Product',
            imageSrc: product?.images?.[0]?.originalSrc || product?.imageSrc || '',
        })),
        ...linkedCollections.map(collection => ({
            id: collection.id,
            title: collection.title,
            type: 'Collection',
            imageSrc: collection?.imageSrc || '', // Collections don't have images in this data
        })),
    ];

    const totalItems = combinedData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginatedData = combinedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const rows = paginatedData.map(({ id, title, type, imageSrc }) => (
        <IndexTable.Row id={id} key={id}>
            <IndexTable.Cell>
                {imageSrc ? <Thumbnail
                    source={imageSrc}
                    alt={title}
                    size="small"
                /> : ''}

            </IndexTable.Cell>
            <IndexTable.Cell>{title}</IndexTable.Cell>
            <IndexTable.Cell>{type}</IndexTable.Cell>
        </IndexTable.Row>
    ));

    const emptyStateMarkup = (
        <EmptySearchResult
            title={'No products or collections found'}
            description={'Try changing the filters or search term'}
            withIllustration
        />
    );
    return (
        <Box paddingBlockEnd="400">
            <Card>
                <IndexTable
                    resourceName={{ singular: 'item', plural: 'items' }}
                    itemCount={combinedData.length}
                    emptyState={emptyStateMarkup}
                    headings={[
                        { title: 'Image' },
                        { title: 'Name' },
                        { title: 'Type' },
                    ]}

                    pagination={
                        combinedData.length > pageSize && {
                            label: `${currentPage} of ${totalPages}`,
                            hasNext: currentPage < totalPages,
                            hasPrevious: currentPage > 1,
                            onPrevious: () => handlePageChange(currentPage - 1),
                            onNext: () => handlePageChange(currentPage + 1),
                        }
                    }
                    selectable={false}
                >

                    {rows}
                </IndexTable>
            </Card>
        </Box >
    )
}

export default ShowLinkedItems
