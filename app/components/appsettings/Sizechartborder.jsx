
import { BlockStack, Box, Card, Grid, Image, InlineGrid, RadioButton, Text } from "@shopify/polaris";
function Sizechartborder({ handleChange, formValues }) {
    const RowData = [
        { id: 'tunnel', text: 'tunnel', imageSrc: '/assets/images/border_a_tunnel.svg' },
        { id: 'lines', text: 'lines', imageSrc: '/assets/images/border_b_lines.svg' },
        { id: 'border_c_grid', text: 'grid', imageSrc: '/assets/images/border_c_grid.svg' },
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
                <BlockStack gap="500">
                    <Text as="h2" variant="headingSm">Border Style</Text>
                    <div style={{ width: '100%', height: 'auto' }}>
                        <InlineGrid gap="400" columns="3" alignItems="start">
                            {RowData.map((item, index) => (
                                <Box key={index} background="bg-surface" borderRadius="50">
                                    <BlockStack gap={400} style={containerStyle}>
                                        <Image source={item.imageSrc} alt="border" width="100%" />
                                        <RadioButton
                                            checked={formValues.borderStyle === item.text}
                                            id={item.id}
                                            name="border_color"
                                            onChange={() => handleChange('borderStyle')(item.text)}
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

export default Sizechartborder
