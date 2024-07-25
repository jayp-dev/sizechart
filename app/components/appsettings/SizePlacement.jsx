
import { BlockStack, Box, Card, Grid, Image, InlineGrid, RadioButton, Text } from "@shopify/polaris";
import { useCallback, useState } from "react";


function SizePlacement() {
    const [value, setValue] = useState('button_floating');
    const handleChange = useCallback(
        (newValue) =>
            setValue(newValue),
        [],
    );
    const RowData = [
        { id: 'button_floating', label: 'Floating on page', text: 'button_floating', imageSrc: '/assets/images/button_floating.svg' },
        { id: 'button_inline', label: 'Inline with text', text: 'button_inline', imageSrc: '/assets/images/button_inline.svg' },
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
                {console.log(value)}
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
                                            checked={value === item.text}
                                            id={item.id}
                                            name="button_placement"
                                            onChange={() => handleChange(item.text)}
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

export default SizePlacement
