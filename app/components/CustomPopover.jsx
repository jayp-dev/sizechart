import { useState, useCallback } from 'react';
import { Button, Popover, FormLayout, ColorPicker, TextField } from '@shopify/polaris';
import useColorConverter from '../hooks/useColorConverter'

function CustomPopover({ id, label, item, color, setColor }) {
    const [active, setActive] = useState(false);
    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const activator = (
        <Button onClick={toggleActive} disclosure>
            {label}
        </Button>
    );

    const [internalColor, setInternalColor, getColorValueHex] = useColorConverter(color);

    const handleColorChange = (newColor) => {
        setInternalColor(newColor);
        setColor(newColor);
    };
    return (
        <Popover
            active={active}
            activator={activator}
            onClose={toggleActive}
            key={id}
            ariaHaspopup={false}
            preferredPosition="below"
            sectioned
        >
            <FormLayout>
                <ColorPicker onChange={handleColorChange} color={internalColor} />
                <TextField
                    type="text"
                    label={`${item.text} Hex`}
                    value={getColorValueHex()}
                    onChange={() => { }}
                />
            </FormLayout>
        </Popover>
    );
}

export default CustomPopover;
