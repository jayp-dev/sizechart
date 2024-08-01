import { json, useActionData, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { BlockStack, Card, Grid, Page, PageActions, Text, TextField } from "@shopify/polaris";
import { getSinglecategory, validateFields } from "../models/sizeCategories.server";
import db from '../db.server';
import { useCallback, useEffect, useMemo, useState } from "react";

export const loader = async ({ request, params }) => {
    const category = await getSinglecategory(Number(params.id));
    return json({ category });
}

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    if (!data.name) {
        return json({ errors: { name: "Name is required" } }, { status: 422 });
    }

    const errors = validateFields(data);
    if (errors) {
        return json({ errors }, { status: 422 });
    }

    await db.sizeCategory.update({
        where: { id: Number(params.id) },
        data
    });

    return json({ success: true }); // Return success state
};

function Categoryedit() {
    const actionData = useActionData();
    const { category } = useLoaderData();
    const navigate = useNavigate();
    const [formState, setFormState] = useState(category.name);
    const [showToast, setShowToast] = useState(false);
    const submit = useSubmit();

    const handleChange = useCallback((newValue) => setFormState(newValue), []);
    const errors = useMemo(() => actionData?.errors || {}, [actionData]);

    function handleUpdate() {
        const data = { name: formState };
        submit(data, { method: "post" });
    }

    useEffect(() => {
        if (actionData?.success) {
            setShowToast(true);
        }
    }, [actionData]);

    useEffect(() => {
        if (showToast) {
            shopify.toast.show('Category Updated Successfully', {
                duration: 3000,
                onDismiss: () => { }
            });
            setShowToast(false); // Reset the toast state after showing the message
            navigate('/app/createcategory')
        }
    }, [showToast, navigate]);

    return (
        <Page>
            <ui-title-bar title={'Edit Category'}>
                <button variant="breadcrumb" onClick={() => navigate('/app/createcategory')}>
                    Category
                </button>
            </ui-title-bar>
            <Grid columns={{ sm: 3 }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 10, xl: 10 }}>
                    <Card>
                        <BlockStack gap={400}>
                            <Text as="h2" variant="bodyMd">
                                Category Name
                            </Text>
                            <TextField
                                id="name"
                                helpText="Create Category For Size Chart"
                                label="Title"
                                labelHidden
                                value={formState}
                                autoComplete="off"
                                onChange={handleChange}
                                error={errors.name}
                                required
                            />
                        </BlockStack>
                        <PageActions
                            primaryAction={{
                                content: 'Update',
                                onAction: handleUpdate,
                            }}
                        />
                    </Card>
                </Grid.Cell>
            </Grid>
        </Page>
    );
}

export default Categoryedit;
