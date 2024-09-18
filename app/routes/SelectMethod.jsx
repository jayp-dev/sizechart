import { Select } from "@shopify/polaris"
import { useCallback } from "react";

function SelectMethod({ setFormValues, formValues }) {
    const handleChange = useCallback(
        (field, value) => {
            setFormValues(prevState => ({ ...prevState, [field]: value }));
        },
        [setFormValues]
    );
    const switchSize = formValues.switch;
    return (
        <Select
            label="Add Switch"
            id="switch"
            options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
            ]}
            onChange={(value) => handleChange('switchSize', value)}
            value={switchSize}
        />
    )
}

export default SelectMethod
