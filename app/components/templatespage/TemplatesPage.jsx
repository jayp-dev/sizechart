import { Card, Text, Page, Tabs, Grid, BlockStack, Button, Image, Box } from "@shopify/polaris"
import { useCallback, useState } from "react";
import Footer from "../../components/Footer";
import { useNavigate } from "@remix-run/react";
import EmptyStateData from "./EmptyState";
function TemplatesPage({ categories, from }) {
    const navigate = useNavigate();
    return (
        <Page backAction={{
            content: "template", onAction: async () => {
                navigate(-1);
            }
        }} title="Templates"
            primaryAction={{ content: 'Get Help' }}>
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
                            {categories.length > 0 && (
                                <TabsInsideOfACardExample categories={categories} from={from} />
                            )}
                            {categories.length == 0 && (
                                <EmptyStateData from={from} />
                            )}
                        </BlockStack>
                    </Card>
                </Grid.Cell>
            </Grid>
            <Footer />
        </Page>
    )
}
export default TemplatesPage
function TabsInsideOfACardExample({ categories, from }) {
    const tabs = categories.map((category, index) => ({
        ...category
    }));

    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );
    const navigate = useNavigate();

    const handleRedirect = (url) => {
        if (url) {
            navigate(url); // Redirect to the passed dynamic URL
        }
    };
    return (

        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <BlockStack gap={500} align="center">
                <div id={`panel-${tabs[selected].id}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {tabs[selected].size_charts.map((item) => (
                        <div key={item.id} style={{ width: '20%', textAlign: 'center', margin: '0 10px' }}>
                            <Box background="bg-surface" borderRadius="200" shadow="500" minWidth="200" maxWidth="300" minHeight="120px" paddingInline="400" >
                                <Placeholder height="50px">
                                    {item.icon ? <Image source={`/uploads/${item.icon}`} width="50%" alt={item.name} /> : ''}
                                </Placeholder>
                                <div style={{ display: 'block', margin: 'auto', marginTop: '10px' }}>
                                    <Button onClick={() => handleRedirect(`/app/createsizechart/edit_chart?chart_id=${item.id}&from=${from}`)}>
                                        {item.name}
                                    </Button>
                                </div>
                            </Box>
                        </div>
                    ))}
                </div>

            </BlockStack>
        </Tabs >


    );
}




const Placeholder = ({ height = 'auto', children }) => {
    return (
        <div
            style={{
                background: 'var(--p-color-border-interactive-subdued)',
                padding: '10px var(--p-space-200)',
                height: height,
                margin: '20px'
            }}
        >{children}</div>
    );
};