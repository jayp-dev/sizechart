import {
    LegacyStack,
    FormLayout,
    TextField,
    Select,
    InlineError,
    LegacyCard,
    Link,
    Text,
} from '@shopify/polaris';
import { useState, useCallback } from 'react';

function TestComponent() {
    const [formState, setFormState] = useState({
        weight: '12',
        unit: '' // This should match the 'value' from options
    });

    const handleChange = useCallback(
        (field, value) => {
            setFormState(prevState => ({ ...prevState, [field]: value }));
        },
        []
    );

    const weight = formState.weight;
    const unit = formState.unit;

    const unitSelectID = 'unit';
    const errorMessage = generateErrorMessage();

    console.log('Form State', formState);

    const options = [
        { label: 'Centimeters', value: '1' }, // Ensure 'value' is a string
        { label: 'Inches', value: '2' }      // Ensure 'value' is a string
    ];

    const formGroupMarkup = (
        <LegacyStack vertical spacing="extraTight">
            <FormLayout>
                <FormLayout.Group condensed>
                    <TextField
                        label="Product weight"
                        type="number"
                        value={weight}
                        onChange={(value) => handleChange('weight', value)}
                        error={Boolean(!weight && unit)}
                        autoComplete="off"
                    />
                    <Select
                        id={unitSelectID}
                        label="Unit of measure"
                        // placeholder="Select"
                        options={options}
                        value={unit}
                        onChange={(value) => handleChange('unit', value)}
                        error={Boolean(!unit && weight)}
                    />
                </FormLayout.Group>
            </FormLayout>
            <InlineError message={errorMessage} fieldID={unitSelectID} />
        </LegacyStack>
    );

    return <LegacyCard sectioned>{formGroupMarkup}</LegacyCard>;

    function generateErrorMessage() {
        const weightError =
            !weight && unit ? 'The numeric weight of the product ' : '';
        const unitError =
            !unit && weight ? 'The unit of measure for the product weight' : '';

        if (!weightError && !unitError) {
            return '';
        }

        return (
            <span>
                <Text tone="critical" as="span">
                    <p>
                        {`${weightError}${unitError} is required when weight-based shipping rates are enabled. `}
                        <Link>Manage shipping</Link>
                    </p>
                </Text>
            </span>
        );
    }
}

export default TestComponent;
