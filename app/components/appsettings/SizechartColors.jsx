import { BlockStack, Card, Grid, Text, InlineGrid } from "@shopify/polaris"

import React from "react"
function SizechartColors() {
    return (
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
            <Card roundedAbove="sm">
                <BlockStack gap="500">
                    <Text as="h2" variant="headingSm">
                        Size chart color
                    </Text>
                    <InlineGridWithVaryingGapExample />
                </BlockStack>
            </Card>
        </Grid.Cell>
    )
}

function InlineGridWithVaryingGapExample() {
    return (
        <SpacingBackground>
            <InlineGrid gap="400" columns={3}>
                <Placeholder height="320px">Inter</Placeholder>
                <Placeholder height="320px">Header Font</Placeholder>
                <Placeholder height="320px">Focus</Placeholder>
            </InlineGrid>
        </SpacingBackground>
    );
}

const SpacingBackground = ({
    children,
    width = '100%',
}) => {
    return (
        <div
            style={{
                width,
                height: 'auto',
            }}
        >
            {children}
        </div>
    );
};

const Placeholder = ({ height = 'auto', width = 'auto', children }) => {
    return (
        <div
            style={{
                display: 'inherit',
                background: 'var(--p-color-bg-surface-success)',
                border: '2px solid var(--p-color-border-caution)',
                height: height ?? undefined,
                width: width ?? undefined,
            }}
        >{children}</div>
    );
};

export default SizechartColors
