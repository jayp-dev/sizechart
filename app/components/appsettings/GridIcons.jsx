import React from 'react';
import { RadioButton, BlockStack, Grid, Thumbnail, Box } from '@shopify/polaris';
import styles from '../appsettings/appsettings.module.css';

function GridExample({ icons }) {
    const [selected, setSelected] = React.useState('option1');
    const handleChange = (value) => setSelected(value);
    return (
        <>
            <Box paddingBlockStart={200}>
                <Grid>
                    {icons.map((icon, index) =>
                        <>
                            <Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 3, lg: 1, xl: 1 }}>
                                <BlockStack inlineAlign="center" gap="400">
                                    <Thumbnail alt={`Icon_${index}`} source={`/uploads/${icon.name}`}></Thumbnail>
                                    <RadioButton
                                        checked={selected === icon.id}
                                        id={icon.id}
                                        name="radioGroup"
                                        onChange={() => handleChange(icon.id)}
                                    />
                                </BlockStack>
                            </Grid.Cell>
                        </>
                    )}
                </Grid>
            </Box>
        </>
    );
}

export default GridExample;
export const links = () => [{ rel: "stylesheet", href: styles }];