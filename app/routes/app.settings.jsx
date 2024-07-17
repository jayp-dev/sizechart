import { BlockStack, Card, Divider, Form, FormLayout, Grid, Select, Text, TextField } from "@shopify/polaris";
import styles from "../styles/welcome.module.css";
import React, { useCallback, useState } from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "react-router";
import useDisplayNames from '../hooks/useDisplayNames';
import GridIcons from "../components/appsettings/GridIcons";
import AppCssInformation from "../components/appsettings/AppCssInformation";
import SizechartColors from "../components/appsettings/SizechartColors";

// import SettingsStyles from "../components/appsettings/appsettings.module.css"
export const loader = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const response = await admin.graphql(`
        query {
          shopLocales {
            locale
            primary
            published
          }
        }
    `);
    const data = await response.json();
    return { data };
}

export default function Settings() {
    const [selected, setSelected] = useState('en');
    const { data } = useLoaderData();
    const displayNames = useDisplayNames('en');
    const [value, setValue] = useState('');
    const handleChange = useCallback(
        (newValue) => setValue(newValue),
        [],
    );

    const localesArray = data?.data?.shopLocales?.map(item => item.locale) || [];
    const options = localesArray.map(locale => ({
        label: displayNames ? displayNames.of(locale) : 'Loading...',
        value: locale
    }));

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    return (
        <div className="Polaris-Page">
            <Form>
                <ui-title-bar title="Settings">
                    <button variant="primary" onClick={() => console.log('Event Clicked')}>
                        Save
                    </button>
                </ui-title-bar>
                <Grid columns={{ sm: 3 }}>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
                        <Card roundedAbove="sm">
                            <FormLayout>
                                <BlockStack gap="500">
                                    <Text as="h2" variant="headingSm">General settings</Text>
                                    <Divider />
                                </BlockStack>
                                <FormLayout.Group>
                                    <Select
                                        label="Language"
                                        options={options}
                                        onChange={handleSelectChange}
                                        value={selected}
                                    />
                                    <TextField
                                        type="text"
                                        label="Language"
                                        onChange={() => { }}
                                        autoComplete="off"
                                    />
                                </FormLayout.Group>
                                <Divider />
                                <BlockStack gap="200">
                                    <Text as="h2" variant="headingSm">Custom css</Text>
                                    <Text as="p" variant="bodyMd">
                                        If you need to add custom CSS to personalize your store's appearance.
                                    </Text>
                                    <TextField
                                        label="Enter css below"
                                        value={value}
                                        onChange={handleChange}
                                        multiline={4}
                                        autoComplete="off"
                                    />
                                </BlockStack>
                            </FormLayout>
                        </Card>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
                        <Card roundedAbove="sm">
                            <FormLayout>
                                <BlockStack gap="500">
                                    <Text as="h2" variant="headingSm">Label</Text>
                                    <Divider />
                                </BlockStack>
                                <FormLayout.Group>
                                    <TextField
                                        type="text"
                                        label="Size Guide"
                                        onChange={() => { }}
                                        autoComplete="off"
                                        value="Sizing Information"
                                        helpText="This text will appear on the size chart button in your store"
                                    />
                                </FormLayout.Group>
                                <Divider />
                                <BlockStack gap="500">
                                    <Text as="h2" variant="headingSm">Icon</Text>
                                </BlockStack>
                            </FormLayout>
                            <GridIcons />
                        </Card>
                    </Grid.Cell>
                    <AppCssInformation />
                    <SizechartColors ></SizechartColors>
                </Grid>
            </Form>

        </div>
    );
}

export const links = () => [{ rel: "stylesheet", href: styles }];
