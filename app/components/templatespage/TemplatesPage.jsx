import { Card, Text, Page, Tabs, Grid, BlockStack } from "@shopify/polaris"
import { useCallback, useState } from "react";

function TemplatesPage() {
    return (
        <Page backAction={{ content: "template", url: '/app' }} title="Templates">
            <Grid columns={{ sm: 3 }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
                    <Card roundedAbove="sm">
                        <Text as="p" variant="bodyMd">
                            Please use these templates as a reference. Keep in mind that the measurements in the size tables might not exactly match your products, as sizing can vary between different brands.
                        </Text>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
                    <Card roundedAbove="sm">
                        <BlockStack gap="500">
                            <TabsInsideOfACardExample />
                        </BlockStack>
                    </Card>
                </Grid.Cell>
            </Grid>

        </Page>
    )
}
export default TemplatesPage
function TabsInsideOfACardExample() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );
    const tabs = [
        {
            id: 'all-customers-1',
            content: 'All',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'women',
            content: 'women',
            panelID: 'women',
        },
        {
            id: 'Men',
            content: 'Men',
            panelID: 'Men',
        },
        {
            id: 'Blank',
            content: 'Blank',
            panelID: 'Blank',
        },
    ];

    return (

        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <Card title="Testing">
                <Text as="h2" variant="headingSm">
                    {tabs[selected].content}
                </Text>
                <p>Tab {selected} selected</p>
            </Card>
        </Tabs>

    );
}