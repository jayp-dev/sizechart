
import { useState } from 'react';
import { BlockStack, Card, Grid, Text } from "@shopify/polaris";
import InlineGridWithVaryingGapExample from '../appsettings/InlineGridWithVaryingGapExample';

function SizechartColors({ handleChange, formValues, GetSettings }) {
    const [colors, setColors] = useState({
        headerColor: JSON.parse(GetSettings.headerColor),
        headerFontColor: JSON.parse(GetSettings.headerFontColor),
        zebraLinesColor: JSON.parse(GetSettings.zebraLinesColor),
        focusColor: JSON.parse(GetSettings.focusColor)
    });

    const updateColor = (id, newColor) => {
        setColors((prevColors) => ({
            ...prevColors,
            [id]: newColor
        }));

        handleChange(id)(JSON.stringify(newColor))
    };
    const RowData = [
        { id: 'headerColor', text: 'Header', imageSrc: '/assets/images/color_header.svg' },
        { id: 'headerFontColor', text: 'Header font', imageSrc: '/assets/images/color_font_header.svg' },
        { id: 'zebraLinesColor', text: 'Zebra lines', imageSrc: '/assets/images/color_zebra.svg' },
        { id: 'focusColor', text: 'Focus', imageSrc: '/assets/images/color_focus.svg' },
    ];

    return (
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
            <Card roundedAbove="sm">
                <BlockStack gap="500">
                    <Text as="h2" variant="headingSm">Size chart color</Text>
                    <InlineGridWithVaryingGapExample RowData={RowData} colors={colors} updateColor={updateColor} />
                </BlockStack>
            </Card>
        </Grid.Cell>
    );
}

export default SizechartColors;
