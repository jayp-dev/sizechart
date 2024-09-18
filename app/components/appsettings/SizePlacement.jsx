
import { BlockStack, Box, Card, Grid, Image, InlineGrid, RadioButton, Text } from "@shopify/polaris";
function SizePlacementSetting({ handleChange, formValues }) {
    const RowData = [
        { id: 'button_floating', label: 'Floating on page', text: 'floating', imageSrc: '/assets/images/button_floating.svg' },
        { id: 'button_inline', label: 'Inline with text', text: 'inline', imageSrc: '/assets/images/button_inline.svg' },
    ];

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    };


    return (
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
            <Card roundedAbove="sm">

                <BlockStack gap="400">
                    <Text as="h2" variant="headingSm">Automatic placement</Text>
                    <div style={{ width: '100%', height: 'auto' }}>
                        <InlineGrid gap="400" columns="3" alignItems="start">
                            {RowData.map((item, index) => (
                                <Box key={index} background="bg-surface" borderRadius="50">
                                    <BlockStack gap={400} style={containerStyle}>
                                        <Image source={item.imageSrc} alt="border" width="100%" />
                                        <RadioButton
                                            label={item.label}
                                            checked={formValues.SizePlacement === item.text}
                                            id={item.id}
                                            name="button_placement"
                                            onChange={() => handleChange('SizePlacement')(item.text)}
                                        />
                                    </BlockStack>
                                </Box>
                            ))}
                        </InlineGrid>
                    </div>
                </BlockStack>
            </Card>
        </Grid.Cell>
    );
}

export default SizePlacementSetting
