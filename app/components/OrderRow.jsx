import { IndexTable, Text, Badge } from '@shopify/polaris';

export const OrderRow = ({ id, order, date, customer, total, paymentStatus, fulfillmentStatus, selected, handleSelectionChange }) => (
    <IndexTable.Row
        id={id}
        selected={selected}
        onSelectionChange={handleSelectionChange}
    >
        <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold">{order}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell numeric>
            <Text>{total}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
    </IndexTable.Row>
);
