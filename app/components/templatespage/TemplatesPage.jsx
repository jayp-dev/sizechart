import { Card, Text, Page, Tabs, Grid, BlockStack, Button, Image, Box } from "@shopify/polaris"
import { useCallback, useState } from "react";
import Footer from "../../components/Footer";
function TemplatesPage({ categories }) {
    return (
        <Page backAction={{ content: "template", url: '/app' }} title="Templates"
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
                            <TabsInsideOfACardExample categories={categories} />
                        </BlockStack>
                    </Card>
                </Grid.Cell>
            </Grid>
            <Footer />
        </Page>
    )
}
export default TemplatesPage
function TabsInsideOfACardExample({ categories }) {
    // const tabs = categories.map((category, index) => ({
    //     ...category
    // }));

    const tabs =
        [
            {
                "id": 4,
                "name": "Blank templates",
                "content": "Blank templates",
                "panelID": "Blank templates",
                "created_at": "2024-06-25T22:15:44.000000Z",
                "updated_at": "2024-06-25T22:15:44.000000Z",
                "size_charts": [
                    {
                        "id": 7,
                        "category_id": "4",
                        "name": "Blank",
                        "image": null,
                        "icon": null,
                        "image_position": "bottom",
                        "description": null,
                        "field_value": "\"[]\"",
                        "created_at": "2024-06-30T20:19:43.000000Z",
                        "updated_at": "2024-06-30T20:19:43.000000Z"
                    },
                    {
                        "id": 8,
                        "category_id": "4",
                        "name": "Women",
                        "image": null,
                        "icon": null,
                        "image_position": "bottom",
                        "description": null,
                        "field_value": "\"[]\"",
                        "created_at": "2024-06-30T20:20:03.000000Z",
                        "updated_at": "2024-06-30T20:20:03.000000Z"
                    },
                    {
                        "id": 9,
                        "category_id": "4",
                        "name": "Men",
                        "image": null,
                        "icon": null,
                        "image_position": "bottom",
                        "description": null,
                        "field_value": "\"[]\"",
                        "created_at": "2024-06-30T20:20:14.000000Z",
                        "updated_at": "2024-06-30T20:20:14.000000Z"
                    },
                    {
                        "id": 10,
                        "category_id": "4",
                        "name": "Girls",
                        "image": null,
                        "icon": null,
                        "image_position": "bottom",
                        "description": null,
                        "field_value": "\"[]\"",
                        "created_at": "2024-06-30T20:20:23.000000Z",
                        "updated_at": "2024-06-30T20:20:23.000000Z"
                    },
                    {
                        "id": 11,
                        "category_id": "4",
                        "name": "BOYS",
                        "image": null,
                        "icon": null,
                        "image_position": "bottom",
                        "description": null,
                        "field_value": "\"[]\"",
                        "created_at": "2024-06-30T20:20:31.000000Z",
                        "updated_at": "2024-06-30T20:20:31.000000Z"
                    }
                ]
            },
            {
                "id": 6,
                "name": "Examples Men",
                "content": "Examples Men",
                "panelID": "Examples Men",
                "created_at": "2024-06-25T22:16:40.000000Z",
                "updated_at": "2024-06-25T22:16:40.000000Z",
                "size_charts": [
                    {
                        "id": 2,
                        "category_id": "6",
                        "name": "Polo",
                        "image": "size-chart-img/V77vdYebcC78aYuOmwDh25MJL1GfStAsTrDebxHU.png",
                        "icon": "icons/dbO521q89VJxwrfx1EEkZqKQEm4XcTp19enLCKM8.png",
                        "image_position": "top",
                        "description": "<p><strong>CHEST</strong></p>\r\n<p>Measure around the fullest part of your chest, keeping the tape measure horizontal.</p>\r\n<p><strong>WAIST</strong></p>\r\n<p>Measure around your natural waistline, which is the narrowest part of your waist, keeping the measuring tape horizontal.</p>\r\n<p><strong>HIPS</strong></p>\r\n<p>Wrap the measuring tape around the fullest part of your hips, which is usually around the widest part of your buttocks, keeping the measuring tape horizontal.</p>",
                        "field_value": "\"[{\\\"\\\":\\\"XS\\\",\\\"Chest\\\":\\\"32-34\\\",\\\"Waist\\\":\\\"26-28\\\",\\\"Hip\\\":\\\"32-34\\\",\\\"UK\\\":\\\"34\\\",\\\"EUR\\\":\\\"44\\\",\\\"AUS\\\":\\\"34\\\"},{\\\"\\\":\\\"S\\\",\\\"Chest\\\":\\\"35-37\\\",\\\"Waist\\\":\\\"29-31\\\",\\\"Hip\\\":\\\"35-37\\\",\\\"UK\\\":\\\"36\\\",\\\"EUR\\\":\\\"46\\\",\\\"AUS\\\":\\\"36\\\"},{\\\"\\\":\\\"M\\\",\\\"Chest\\\":\\\"38-40\\\",\\\"Waist\\\":\\\"32-34\\\",\\\"Hip\\\":\\\"38-40\\\",\\\"UK\\\":\\\"38-40\\\",\\\"EUR\\\":\\\"48-50\\\",\\\"AUS\\\":\\\"38-40\\\"},{\\\"\\\":\\\"L\\\",\\\"Chest\\\":\\\"41-43\\\",\\\"Waist\\\":\\\"35-37\\\",\\\"Hip\\\":\\\"41-43\\\",\\\"UK\\\":\\\"42-44\\\",\\\"EUR\\\":\\\"52-54\\\",\\\"AUS\\\":\\\"42-44\\\"},{\\\"\\\":\\\"XL\\\",\\\"Chest\\\":\\\"44-46\\\",\\\"Waist\\\":\\\"38-40\\\",\\\"Hip\\\":\\\"44-46\\\",\\\"UK\\\":\\\"46\\\",\\\"EUR\\\":\\\"56\\\",\\\"AUS\\\":\\\"46\\\"},{\\\"\\\":\\\"XXL\\\",\\\"Chest\\\":\\\"47-49\\\",\\\"Waist\\\":\\\"41-43\\\",\\\"Hip\\\":\\\"47-49\\\",\\\"UK\\\":\\\"48\\\",\\\"EUR\\\":\\\"58\\\",\\\"AUS\\\":\\\"48\\\"}]\"",
                        "created_at": "2024-06-27T21:18:37.000000Z",
                        "updated_at": "2024-06-27T21:18:37.000000Z"
                    },
                    {
                        "id": 3,
                        "category_id": "6",
                        "name": "Shirt",
                        "image": "size-chart-img/7qckihjyaFjRKtTDJLeIQZFTGvMlZUBlzyUGZaxP.png",
                        "icon": "icons/4vUAbOXAlBlExtCc4Lne4wt7ticAGSysj6eqNP82.png",
                        "image_position": "bottom",
                        "description": "<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://smartsize.io/illustrations/comic/man_front_back_shirt.svg\" alt=\"\" width=\"454\" height=\"456\"></p>\r\n<p><strong>NECK</strong></p>\r\n<p>Measure around the base of your neck, where the collar would sit.</p>\r\n<p><strong>CHEST</strong></p>\r\n<p>Measure around the fullest part of your chest, keeping the tape measure horizontal.</p>\r\n<p><strong>WAIST&nbsp;</strong></p>\r\n<p>Measure around your natural waistline, which is the narrowest part of your waist, keeping the measuring tape horizontal.</p>\r\n<p><strong>SLEEVE LENGTH</strong></p>\r\n<p>Measure from the center back of your neck, across your shoulder and down to your wrist, following the natural curve of your arm.</p>",
                        "field_value": "\"[{\\\"\\\":\\\"XS\\\",\\\"Chest\\\":\\\"32-34\\\",\\\"Waist\\\":\\\"26-28\\\",\\\"Hip\\\":\\\"32-34\\\",\\\"UK\\\":\\\"34\\\",\\\"EUR\\\":\\\"44\\\",\\\"AUS\\\":\\\"34\\\"},{\\\"\\\":\\\"S\\\",\\\"Chest\\\":\\\"35-37\\\",\\\"Waist\\\":\\\"29-31\\\",\\\"Hip\\\":\\\"35-37\\\",\\\"UK\\\":\\\"36\\\",\\\"EUR\\\":\\\"46\\\",\\\"AUS\\\":\\\"36\\\"},{\\\"\\\":\\\"M\\\",\\\"Chest\\\":\\\"38-40\\\",\\\"Waist\\\":\\\"32-34\\\",\\\"Hip\\\":\\\"38-40\\\",\\\"UK\\\":\\\"38-40\\\",\\\"EUR\\\":\\\"48-50\\\",\\\"AUS\\\":\\\"38-40\\\"}]\"",
                        "created_at": "2024-06-27T21:22:14.000000Z",
                        "updated_at": "2024-07-11T12:44:44.000000Z"
                    }
                ]
            },
            {
                "id": 7,
                "name": "Examples Women",
                "content": "Examples Women",
                "panelID": "Examples Women",
                "created_at": "2024-06-25T22:16:49.000000Z",
                "updated_at": "2024-06-25T22:16:49.000000Z",
                "size_charts": []
            }
        ]



    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    return (

        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <BlockStack gap={500} align="center">
                <div id={`panel-${tabs[selected].id}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {tabs[selected].size_charts.map((item) => (
                        <div key={item.id} style={{ width: '25%', textAlign: 'center', margin: '0 10px' }}>
                            <Box background="bg-surface" borderRadius="200" shadow="500" minWidth="200" maxWidth="300">
                                <Placeholder>
                                    {item.icon ? (
                                        // <Image source={`/storage/${item.icon}`} width="50%" alt={item.name} />
                                        <Image source={`https://demosrvr.co.in/project/shopifyapps/admin/storage/${item.icon}`} width="50%" alt={item.name} />
                                    ) : <Image source={`https://demosrvr.co.in/project/shopifyapps/admin/storage/icons/dbO521q89VJxwrfx1EEkZqKQEm4XcTp19enLCKM8.png`} width="50%" alt={item.name} />}
                                    <div style={{ display: 'block', margin: 'auto', marginTop: '10px' }}>

                                        <Button>
                                            {item.name}
                                        </Button>
                                    </div>

                                </Placeholder>
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
                padding: '30px var(--p-space-200)',
                height: height,
                margin: '20px'
            }}
        >{children}</div>
    );
};