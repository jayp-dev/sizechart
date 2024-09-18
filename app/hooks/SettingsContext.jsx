import React, { createContext, useContext, useState, useCallback } from 'react';

// Create a context
const SettingsContext = createContext();

// Create a provider component
export const SettingsProvider = ({ children, initialSettings }) => {
    const [formValues, setFormValues] = useState(initialSettings);

    const handleChange = useCallback((key) => (value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    }, []);

    return (
        <SettingsContext.Provider value={{ formValues, handleChange }}>
            {children}
        </SettingsContext.Provider>
    );
};

// Create a custom hook to use the context
export const useSettings = () => {
    return useContext(SettingsContext);
};
