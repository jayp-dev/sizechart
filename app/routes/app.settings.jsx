import { BlockStack, Card, Divider, Form, FormLayout, Grid, Text, TextField } from "@shopify/polaris";
import styles from "../styles/welcome.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "react-router";
import GridIcons from "../components/appsettings/GridIcons";
import AppCssInformation from "../components/appsettings/AppCssInformation";
import SizechartColors from "../components/appsettings/SizechartColors";
import Footer from "../components/Footer";
import Sizechartborder from "../components/appsettings/Sizechartborder";
import SizePlacementSetting from "../components/appsettings/SizePlacement";
import AppEmbdedBanner from "../components/AppEmbdedBanner";
import db from '../db.server';
import { GetAppEnable } from "../models/WelcomeScreen";
import { getShopFromRequestSettings, ShopSettingUpdate } from "../models/ShopSettings";
import { json, useActionData, useSubmit } from "@remix-run/react";
export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);
    const extensionId = process.env.SHOPIFY_SIZECHARTPRO_ID;
    const handle = 'SizechartEmbed';
    const addAppBlockId = `${extensionId}/${handle}`;
    const isAppEnable = await GetAppEnable(admin, session, extensionId);
    const shop = await admin.rest.resources.Shop.all({ session });
    const icons = await db.chartIcons.findMany();
    const GetSettings = await getShopFromRequestSettings(session);

    if (icons) {
        return { shop, icons, isAppEnable, addAppBlockId, GetSettings };
    }
    if (icons) {
        return { icons };
    }
    return null
}


export async function action({ request, params }) {
    /** @type {any} */

    const data = {
        ...Object.fromEntries(await request.formData())
    }
    const { session } = await authenticate.admin(request);
    try {
        const response = await ShopSettingUpdate(session, data);
        if (response != null) {
            return json({ success: true, message: 'Settings updated successfully' })
        }
        return json({ error: 'Something went wrong ' })
    } catch (error) {
        console.error("Error performing action:", error);
        return json({ error: error.message }, { status: 500 });
    }
}


export default function Settings() {
    const { shop, icons, addAppBlockId, isAppEnable, GetSettings } = useLoaderData();
    const actionData = useActionData();
    const [isBannerVisible, setisBannerVisible] = useState(GetSettings.BannerEnable);
    const { sizeGuideTitle, ChartIconId, SizePlacement, borderStyle, customCss } = GetSettings;
    const [formValues, setFormValues] = useState({
        sizeGuideTitle: sizeGuideTitle,
        ChartIconId: ChartIconId,
        headerColor: GetSettings.headerColor,
        headerFontColor: GetSettings.headerFontColor,
        zebraLinesColor: GetSettings.zebraLinesColor,
        focusColor: GetSettings.focusColor,
        borderStyle: borderStyle ? borderStyle : "tunnel",
        customCss: customCss ? customCss : '',
        SizePlacement: SizePlacement ? SizePlacement : 'inline'
    });
    const [showToast, setShowToast] = useState(false);
    const [initialValues, setInitialValues] = useState(formValues);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const submit = useSubmit();
    const handleChange = useCallback((key) => (value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    }, []);

    // Use useEffect to monitor formValues changes
    useEffect(() => {
        const hasChanges = () => JSON.stringify(formValues) !== JSON.stringify(initialValues);
        setIsButtonEnabled(hasChanges());
    }, [formValues, initialValues]); // Include both formValues and initialValues

    // const error = useRouteError();

    useEffect(() => {
        if (actionData?.success) {
            setShowToast(true);
        }
    }, [actionData]);

    useEffect(() => {
        if (showToast) {
            shopify.toast.show('Settings updated successfully', {
                duration: 3000,
                onDismiss: () => { }
            });
            setShowToast(false);
        }
    }, [showToast]);

    const handleBanner = useCallback(
        (newValue) => setisBannerVisible(!newValue),
        [],
    );


    const handleSave = () => {
        // Save logic here
        const data = formValues;
        submit(data, { method: 'POST' })
        setInitialValues(formValues); // Update initial values after save
        setIsButtonEnabled(false); // Disable button after save
    };

    return (
        <div className="Polaris-Page">

            <ui-title-bar title="Settings">
                <button variant="primary" onClick={() => handleSave()} disabled={!isButtonEnabled}>
                    Save
                </button>
            </ui-title-bar>
            <Grid columns={{ sm: 3 }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
                    {!isAppEnable && isBannerVisible && (
                        <AppEmbdedBanner addAppBlockId={addAppBlockId} shop={shop} onDismiss={handleBanner} />
                    )}
                    <Card roundedAbove="sm">
                        <FormLayout>
                            <BlockStack gap="500">
                                <Text as="h2" variant="headingSm">General settings</Text>
                            </BlockStack>
                            <Divider />
                            <BlockStack gap="200">
                                <Text as="h2" variant="headingSm">Custom css</Text>
                                <Text as="p" variant="bodyMd">
                                    If you need to add custom CSS to personalize your store's appearance.
                                </Text>
                                <TextField
                                    label="Enter css below"
                                    multiline={4}
                                    onChange={handleChange('customCss')}
                                    autoComplete="off"
                                    value={formValues.customCss}
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
                                    onChange={handleChange('sizeGuideTitle')}
                                    autoComplete="off"
                                    value={formValues.sizeGuideTitle}
                                    helpText="This text will appear on the size chart button in your store"
                                />
                            </FormLayout.Group>
                            <Divider />
                            <BlockStack gap="500">
                                <Text as="h2" variant="headingSm">Icons</Text>
                            </BlockStack>
                        </FormLayout>
                        <GridIcons icons={icons} handleChange={handleChange} formValues={formValues} />
                    </Card>
                </Grid.Cell>
                <SizePlacementSetting handleChange={handleChange} formValues={formValues} />
                <AppCssInformation addAppBlockId={addAppBlockId} shop={shop} />
                <SizechartColors GetSettings={GetSettings} handleChange={handleChange} formValues={formValues}></SizechartColors>
                <Sizechartborder handleChange={handleChange} formValues={formValues} />
            </Grid>

            <Footer />
        </div>
    );
}

export const links = () => [{ rel: "stylesheet", href: styles }];
