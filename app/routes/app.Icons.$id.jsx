import { BlockStack, Box, Card, Grid, InlineGrid, Layout, Page, Text, Thumbnail } from "@shopify/polaris";
import DropZoneFileUploads from "../components/DropZoneFileUploads";
import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import db from "../db.server";
import fs from 'fs';
import path from 'path';
import { json } from "@remix-run/node";


export const loader = async ({ request }) => {
    const icons = await db.chartIcons.findMany();
    if (icons) {
        return json({ icons })
    }
    return json({ response: null })
}

export const action = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("image");

    if (file && file instanceof File) {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filePath = path.join(uploadDir, file.name);
        // Create uploads directory if it doesn't exist Rj45 cr 2225
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write the file to the uploads directory
        try {
            fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));

            await db.chartIcons.create({
                data: {
                    name: file.name,
                    path: filePath,
                    size: file.size,
                    type: file.type,
                },
            });

            return json({ success: true, message: "File uploaded successfully" }, { status: 200 });
        } catch (error) {
            console.error("Error writing file:", error);
            return json({ error: 'File upload failed', message: "File upload failed" }, { status: 500 });
        }

    }

    return json({ error: 'File upload failed', message: "No file uploaded" }, { status: 400 });
};
function Icons() {
    const actionData = useActionData();
    const { icons } = useLoaderData();
    const [file, setFile] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const submit = useSubmit();

    const errors = useMemo(() => actionData?.errors || {}, [actionData]);

    useEffect(() => {
        if (actionData?.success) {
            setShowToast(true);
            setFile(null)
        }
    }, [actionData]);

    useEffect(() => {
        if (showToast) {
            shopify.toast.show('Icon Uploaded Successfully', {
                duration: 3000,
                onDismiss: () => { }
            });
            setShowToast(false);
        }
    }, [showToast]);
    const handleFileChange = (newFile) => {
        setFile(newFile);
    };

    const handleClear = () => {
        setFile(null);
    };

    const handleSelect = () => {
        const formData = new FormData();
        if (file) {
            formData.append("image", file);
            submit(formData, { method: 'post', encType: "multipart/form-data" });
        }
    };

    return (
        <Page title="Create Icons"
            backAction={{ content: 'App', url: '/app' }}
            subtitle="Icons can be managed through a dedicated interface, where admins can view all uploaded icons, delete unnecessary ones, and update existing icons."
            primaryAction={{ content: 'Save', onAction: handleSelect }}>
            <Layout>
                <Layout.Section variant="fullWidth">
                    <Card roundedAbove="sm">
                        <BlockStack gap="200">
                            <InlineGrid columns="1fr auto">
                                <Text as="h2" variant="headingSm">
                                    Upload Custom Icons
                                </Text>
                            </InlineGrid>
                            <InlineGrid columns={['oneThird', 'twoThirds']} gap="400">
                                <Card roundedAbove="sm" padding={200} gap="200">
                                    <Box padding={400}>
                                        <BlockStack gap={400}>
                                            <DropZoneFileUploads
                                                ismodel={false}
                                                onFileChange={handleFileChange}
                                                onClear={handleClear}
                                                onSelect={handleSelect}
                                                file={file}
                                            />
                                        </BlockStack>
                                    </Box>
                                </Card>
                                <Card roundedAbove="sm" padding={200} gap="200">
                                    <BlockStack>
                                        <Grid>
                                            {icons.map((icon, index) =>
                                                <div key={icon.id}>
                                                    <Grid.Cell columnSpan={{ xs: 2, sm: 3, md: 3, lg: 2, xl: 2 }}>
                                                        <BlockStack inlineAlign="center" gap="400">
                                                            <Thumbnail alt={`Icon_${index}`} source={`/uploads/${icon.name}`}></Thumbnail>
                                                        </BlockStack>
                                                    </Grid.Cell>
                                                </div>
                                            )}
                                        </Grid>

                                    </BlockStack>
                                </Card>
                            </InlineGrid>
                        </BlockStack>
                    </Card>
                    <Footer />
                </Layout.Section>
            </Layout>
        </Page>
    );
}

export default Icons;

