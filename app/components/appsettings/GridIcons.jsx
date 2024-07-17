import React from 'react';
import { Card, RadioButton, BlockStack } from '@shopify/polaris';
import styles from '../appsettings/appsettings.module.css';

function GridExample() {
    const [selected, setSelected] = React.useState('option1');
    const handleChange = (value) => setSelected(value);
    const renderCard = (id) => (
        <Card sectioned key={id} roundedAbove="sm">
            <BlockStack align="center">
                <span className="Polaris-Thumbnail Polaris-Thumbnail--sizeMedium" style={{
                    background: 'var(--p-color-bg)',
                    height: 'auto',
                    margin: 'auto',
                    width: '50px',
                    borderRadius: '50%',
                }}>
                    <img alt="Black choker necklace" src="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" />
                </span>
                <div className={styles.setting_option_lable}>
                    <RadioButton
                        label=""
                        checked={selected === id}
                        id={id}
                        name="radioGroup"
                        onChange={() => handleChange(id)}
                    />
                </div>
            </BlockStack>
        </Card>
    );

    const gridItems = Array.from({ length: 16 }, (_, i) => renderCard(`option${i + 1}`));
    return (
        <>
            <div className={styles.gridcontainer}>
                {gridItems}
            </div >
        </>
    );
}

export default GridExample;
export const links = () => [{ rel: "stylesheet", href: styles }];