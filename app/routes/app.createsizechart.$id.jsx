import { json } from "@remix-run/node"
import { Badge, Banner, Bleed, BlockStack, Box, Button, ButtonGroup, Card, Divider, DropZone, InlineGrid, InlineStack, Layout, Link, Page, PageActions, Select, Text, TextField, } from "@shopify/polaris";
import { useLoaderData } from "react-router";
import { PersonalizedTextIcon, ViewIcon, DataTableIcon, ResetIcon, AlertCircleIcon, PlusCircleIcon, CollectionIcon, ProductIcon, MaximizeIcon } from '@shopify/polaris-icons';
import AppEmbdedBanner from "../components/AppEmbdedBanner";
import { useCallback, useEffect, useState } from "react";
import SizeChartTable from "../components/SizeChartTable";
import Editor from "../components/Editor";
import DropZoneFileUploads from "../components/DropZoneFileUploads";
import { GetAppEnable } from "../models/WelcomeScreen";
import { authenticate } from "../shopify.server";
import ShowLinkedItems from "../components/SizeChart/ShowLinkedItems";
import { getSizeCategories } from "../models/sizeCategories.server";
import { ImageSaveInApp } from "../models/ImageSaveInApp";
import { useActionData, useSubmit, useNavigate } from "@remix-run/react";
import { ShopImagesGet } from "../models/ShopImagesGet";
import { PredefinedSize } from "../models/PredefinedSize";
import { PredefinedSizeChartGet, StoreSizeChartGet } from "../models/SizeChartGet";
import { AdminSizeUpdate } from "../models/AdminSizeUpdate";
import { UserSizeChartCreate, UserSizeChartUpdate } from "../models/UserSizeChart";
import { fetchOtherSizeChartCollections, fetchOtherSizeChartProducts } from "../models/FetchSelected";
import InlineDropZone from "../components/InlineDropZone";
import { saveFileLocally } from "../models/saveFileLocally";
import PreviewChart from "../components/SizeChart/PreviewChart";
import { getShopFromRequestSettings } from "../models/ShopSettings";


export const loader = async ({ request, params }) => {
    const { admin, session } = await authenticate.admin(request);
    const url = new URL(request.url);  // Create a URL object from the request URL
    const extensionId = process.env.SHOPIFY_SIZECHARTPRO_ID;
    const handle = 'SizechartEmbed';
    const addAppBlockId = `${extensionId}/${handle}`;
    const isAppEnable = await GetAppEnable(admin, session, extensionId);
    const shop = await admin.rest.resources.Shop.all({ session });
    const application_url = process.env.SHOPIFY_APP_URL || "";
    const SizeCategory = await getSizeCategories();
    const chartImages = await ShopImagesGet(session, admin);
    const SelectedProducts = await fetchOtherSizeChartProducts(session);
    const SelectedCollections = await fetchOtherSizeChartCollections(session);
    const shopSettings = await getShopFromRequestSettings(session);
    if (params.id === 'admin') {
        return json({ addAppBlockId, isAppEnable, shop, isAdmin: true, SizeCategory, application_url, chartImages, SelectedProducts, SelectedCollections, shopSettings });
    }

    if (params.id === 'edit_chart') {
        const chartId = url.searchParams.get("chart_id");
        const from = url.searchParams.get("from");
        if (from === 'user_chart') {
            const sizechart = await StoreSizeChartGet(session, admin, chartId, from);
            if (sizechart.status == 200) {
                return json({ addAppBlockId, isAppEnable, shop, isAdmin: false, SizeCategory, application_url, chartImages, sizechart: sizechart.response, from, SelectedProducts, SelectedCollections, shopSettings });
            }
        }
        const sizechart = await PredefinedSizeChartGet(session, admin, chartId, from);
        if (sizechart.status == 200) {
            return json({ addAppBlockId, isAppEnable, shop, isAdmin: false, SizeCategory, application_url, chartImages, sizechart: sizechart.response[0], from, SelectedProducts, SelectedCollections, shopSettings });
        }
    }

    return json({ addAppBlockId, isAppEnable, shop, SizeCategory, chartImages, SelectedProducts, SelectedCollections, shopSettings });

}
export const action = async ({ request, params }) => {
    /** @type {any} */
    const data = {
        ...Object.fromEntries(await request.formData()),
    };
    try {
        const { session } = await authenticate.admin(request);
        const formValues = JSON.parse(data.formValues);
        const tableData = JSON.parse(data.tableData);
        const url = new URL(request.url);  // Create a URL object from the request URL
        const chartId = url.searchParams.get("chart_id");
        const from = url.searchParams.get("from");
        if (params.id === 'admin') {
            const fileData = JSON.parse(data.formValues).template_icon;
            let iconName = '';
            if (fileData) {
                const { fileName, fileBase64 } = fileData;
                iconName = await saveFileLocally(fileBase64, fileName);
            }
            const Response = await PredefinedSize(formValues, tableData, session, iconName);
            if (!Response.error) {
                return json({ success: true, message: 'Chart updated successfully', Response })
            }
            return json({ Response })
        } else if (from === 'admin') {
            const response = await AdminSizeUpdate(formValues, tableData, session, chartId)
            return json({ success: true, message: 'Admin Size Update successfully', response })
        } else if (from === 'linked_products') {
            // return json({ formValues, tableData, session, chartId })
            if (formValues.id) {
                const saved = await UserSizeChartUpdate(formValues, tableData, session, formValues.id);
                if (!saved.error) {
                    return json({ success: true, response: saved, message: 'Data saved successfully' })
                }
            }
            const userzise = await UserSizeChartCreate(formValues, tableData, session, chartId)
            if (!userzise.error) {
                return json({ success: true, response: userzise, message: 'Size chart create successfully' })
            }

            return json({ response: userzise })
        } else if (from === 'user_chart') {
            // return json({ formValues, tableData, session, chartId })
            const update_userchart = await UserSizeChartUpdate(formValues, tableData, session, chartId);
            if (!update_userchart.error) {
                return json({ success: true, response: update_userchart, message: 'Size chart update successfully' })
            }
            return json({ response: update_userchart })
        }

    } catch (error) {
        console.error("Error performing action:", error);
        return json({ error: error.message }, { status: 500 });
    }
}
function Createsizechart() {
    const actionData = useActionData();
    const [isSaved, setSaved] = useState('');
    const [PreviewEnable, setPreviewEnable] = useState(false);
    useEffect(() => {
        if (actionData) {
            setSaved(actionData?.response?.id)
            console.log("Action Data:", actionData);
            console.log('action id', actionData?.response?.id)
        }
    }, [actionData]);

    const { addAppBlockId, isAppEnable, shop, isAdmin, SizeCategory, application_url, chartImages, sizechart, from, SelectedProducts, SelectedCollections, shopSettings } = useLoaderData();
    const [columns, setColumns] = useState(['']);
    // console.log(shop);
    const [file, setFile] = useState(null);
    const [icon, setIcon] = useState(null);
    const {
        id = '',
        name = '',
        sizeCategoryId = '',
        status = '',
        allow_converter = '',
        allow_converter_in = '',
        rounding_mode = '',
        rounding_numOfDecimals = '',
        rounding_roundTo = '',
        content = '',
        image = '',
        user_chart_data = '',
        LinkedCollection = [],
        LinkedProduct = [],
        template_icon = '',
    } = sizechart || {};

    useEffect(() => {
        if (user_chart_data) {
            const dataChart = JSON.parse(user_chart_data);
            const headers = Object.keys(dataChart[0]);
            setColumns(headers)
        }
    }, [user_chart_data]);

    const [tableData, setTableData] = useState(user_chart_data ? JSON.parse(user_chart_data) : []);
    const [selectImage, setSelectImage] = useState(image || null);
    const [showToast, setShowToast] = useState(false);
    const Categories = SizeCategory.map(item => ({
        label: item.name,
        value: item.name,
        id: item.id
    }));

    const [formValues, setFormValues] = useState(() => {
        const defaultCategory = Categories.length > 0 ? Categories[0] : { value: '', id: '' };
        // If sizeCategoryId exists, find the corresponding category, otherwise use the default
        const selectedCategory = sizeCategoryId
            ? Categories.find(category => category.id === sizeCategoryId) || defaultCategory
            : defaultCategory;

        return {
            id: isSaved || '',
            category: {
                id: sizeCategoryId ? selectedCategory.id : defaultCategory.id,
                value: sizeCategoryId ? selectedCategory.value : defaultCategory.value
            },
            allow_converter: `${allow_converter}` || 'true',
            name: name || '',
            status: status || 'draft',
            allow_converter_in: allow_converter_in || 1,
            rounding_mode: rounding_mode || "auto",
            rounding_numOfDecimals: rounding_numOfDecimals || 1,
            rounding_roundTo: rounding_roundTo || 0.1,
            content: content,
            LinkedProducts: LinkedProduct,
            Linkedcollection: LinkedCollection,
            image: image || selectImage,
            template_icon: template_icon || ''
        };
    });


    // Update the `id` field in `formValues` when `isSaved` changes
    useEffect(() => {
        if (isSaved) {
            setFormValues(prevValues => ({
                ...prevValues,
                id: isSaved
            }));
        }
    }, [isSaved]);

    useEffect(() => {
        setFormValues((prevValues) => ({
            ...prevValues,
            image: selectImage,
        }));
    }, [selectImage]);

    const [initialValues, setInitialValues] = useState(formValues);
    const [linkedProducts, setLinkedProducts] = useState(LinkedProduct);
    const [linkedCollections, setLinkedCollections] = useState(LinkedCollection);
    const [loading, setLoading] = useState(false);
    const [showlinked, setLinked] = useState(false);
    const [bannerProducts, setbannerProducts] = useState(false);
    const navigate = useNavigate();
    const handleContentChange = (e, rowIndex, colIndex) => {
        const value = e.target.textContent;

        if (rowIndex === null) {
            const newColumns = [...columns];
            const oldColumnName = newColumns[colIndex];
            newColumns[colIndex] = value;
            const newData = tableData.map(row => {
                const newRow = { ...row };
                if (oldColumnName !== value) {
                    newRow[value] = newRow[oldColumnName];
                    delete newRow[oldColumnName];
                }
                return newRow;
            });

            setColumns(newColumns);
            setTableData(newData);
        } else {
            const newData = [...tableData];
            newData[rowIndex][columns[colIndex]] = value;
            setTableData(newData);
        }
    };

    const addColumn = () => {
        const newColumn = `Column ${columns.length + 1}`;
        let columnName = newColumn;
        while (columns.includes(columnName)) {
            columnName = `Column ${Math.random().toString(36).substring(7)}`;
        }

        const newColumns = [...columns, columnName];
        const newData = tableData.map(row => ({
            ...row,
            [columnName]: '', // Add the new column with an empty value
        }));

        setColumns(newColumns);
        setTableData(newData);
    };


    const addRow = () => {
        const newRow = columns.reduce((acc, column) => {
            acc[column] = '';
            return acc;
        }, {});
        setTableData([...tableData, newRow]);
    };

    const options = [
        { label: 'Draft', value: 'draft', },
        { label: 'Active', value: 'active' },

    ];

    const sizeoptions = [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' }
    ];

    const lablechangeoptions = [
        { label: 'Centimeters', value: "1" },
        { label: 'Inches', value: "2" },
    ]

    const showLinkedItems = useCallback(async () => {
        setLinked(!showlinked);
    }, [showlinked]);


    const handleChange = useCallback(
        (field, value) => {
            const updates = [
                {
                    condition: field === 'status' && (linkedProducts.length === 0 && linkedCollections.length === 0),
                    action: () => setbannerProducts(true)
                },
                {
                    condition: field === 'status' && (linkedProducts.length > 0 || linkedCollections.length > 0),
                    action: () => {
                        setbannerProducts(false);
                        setFormValues(prevState => ({ ...prevState, [field]: value }));
                    }
                },
                {
                    condition: field !== 'status',
                    action: () => setFormValues(prevState => ({ ...prevState, [field]: value }))
                }
            ];

            updates.reduce((_, { condition, action }) => {
                if (condition) action();
            }, null);
        },
        [linkedCollections, linkedProducts]
    );

    const handleProductSelection = useCallback(async () => {
        setLoading(true);
        try {
            const selected = await shopify.resourcePicker({
                type: 'product',
                multiple: true,
                filter: {
                    hidden: true,
                    variants: false,
                    draft: false,
                    archived: false,
                },
            });

            if (selected) {

                const otherSizeChartProducts = SelectedProducts;
                const otherSizeChartProductIds = otherSizeChartProducts.map(product => product.productId);
                const alreadyLinkedProducts = selected.filter(product =>
                    otherSizeChartProductIds.includes(product.id)
                );
                const newProducts = selected.filter(product =>
                    !otherSizeChartProductIds.includes(product.id)
                );

                if (alreadyLinkedProducts.length > 0) {
                    shopify.toast.show(`The following products are already added to another size chart: ${alreadyLinkedProducts.map(product => product.title).join(', ')}`, {
                        onDismiss: () => { shopify.toast.hide() }
                    });
                }

                if (newProducts.length > 0) {
                    // console.log(newProducts);
                    setLinkedProducts(prevLinkedProducts => [
                        ...newProducts.map(product => ({
                            id: product.id,
                            title: product.title,
                            type: 'Product',
                            imageSrc: product.images[0]?.originalSrc || '',
                        }))
                    ]);

                    handleChange('LinkedProducts', [
                        ...newProducts.map(product => ({
                            id: product.id,
                            title: product.title,
                            type: 'Product',
                            imageSrc: product.images[0]?.originalSrc || '',
                        }))
                    ]);

                    if (alreadyLinkedProducts.length === 0) {
                        shopify.toast.show(`Products added successfully!. Please save Linked Products click on save button`, {
                            onDismiss: () => { shopify.toast.hide() }
                        });
                    }
                } else if (newProducts.length === 0) {
                    shopify.toast.show(`No new products were selected or all selected products are already linked.`, {
                        onDismiss: () => { shopify.toast.hide() }
                    });
                }
            } else {
                setShowToast(true);
            }
        } catch (error) {
            shopify.toast.show(`An error occurred while selecting products.`, {
                onDismiss: () => { shopify.toast.hide() }
            });

        } finally {
            setLoading(false);
        }
    }, [handleChange, SelectedProducts]);

    const handleCollectionSelection = useCallback(async () => {
        setLoading(true);
        try {
            const selected = await shopify.resourcePicker({
                type: 'collection',
                multiple: true,
            });

            if (selected) {
                // console.log(selected)
                const otherSizeChartCollection = SelectedCollections;
                const otherSizeCharCollectionIds = otherSizeChartCollection.map(collection => collection.collectionId);
                const alreadyLinkedCollections = selected.filter(collection =>
                    otherSizeCharCollectionIds.includes(collection.id)
                );
                const newCollections = selected.filter(collection =>
                    !otherSizeCharCollectionIds.includes(collection.id)
                );

                if (alreadyLinkedCollections.length > 0) {
                    shopify.toast.show(`The following products are already added to another size chart: ${alreadyLinkedCollections.map(collection => collection.title).join(', ')}`, {
                        onDismiss: () => { shopify.toast.hide() }
                    });
                }

                if (newCollections.length > 0) {
                    setLinkedCollections(prevLinkedProducts => [
                        ...newCollections.map(collection => ({
                            id: collection.id,
                            title: collection.title,
                            type: 'Collection',
                            imageSrc: collection?.image?.originalSrc || '',
                        }))
                    ]);

                    handleChange('LinkedProducts', [
                        ...newCollections.map(collection => ({
                            id: collection.id,
                            title: collection.title,
                            type: 'Collection',
                            imageSrc: '',
                        }))
                    ]);

                    if (alreadyLinkedCollections.length === 0) {
                        shopify.toast.show(` Collection Added successfully please save.`, {
                            onDismiss: () => { shopify.toast.hide() }
                        });
                    }
                } else if (newCollections.length === 0) {
                    shopify.toast.show(`No new collection were selected or all selected collection are already linked.`, {
                        onDismiss: () => { shopify.toast.hide() }
                    });
                }
            } else {
                setShowToast(true);
            }
        } catch (error) {
            shopify.toast.show(`An error occurred while selecting products.`, {
                onDismiss: () => { shopify.toast.hide() }
            });
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    }, [handleChange, SelectedCollections]);
    const handleChangeselect = (field) => (selectedValue) => {
        const selectedCategory = Categories.find(category => category.value === selectedValue);
        setFormValues(prevValues => ({
            ...prevValues,
            [field]: {
                id: selectedCategory ? selectedCategory.id : '',
                value: selectedValue
            }
        }));
    };

    const handleFileChange = (newFile) => {
        setFile(newFile);
    };
    const HandleiconChange = async (newFile) => {
        try {
            setIcon(newFile);
            const base64File = await fileToBase64(newFile);
            const fileData = {
                fileName: newFile.name,
                fileBase64: base64File
            };
            handleChange('template_icon', fileData);  // Store the Base64 string in formValues
        } catch (error) {
            console.error('Error converting file to Base64:', error);
        }
    };


    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);  // Read the file as a Data URL (Base64 encoded)
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleClear = () => {
        setFile(null);
    };

    const handleUpload = useCallback(async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('application_url', application_url);

            const response = await fetch('/api/upload-to-shopify', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                const { ImageId } = result;
                const imageSave = await ImageSaveInApp(ImageId)
                if (imageSave.data.success == true) {

                    formData.append('image_id', ImageId);
                    const response = await fetch('/api/imageget', {
                        method: 'POST',
                        body: formData,
                    });

                    const result = await response.json();
                    if (result.success == true) {
                        setSelectImage(result.imageUrl)
                        handleChange('image', result.imageUrl)
                        setFile(null)
                    }
                }

            } else {
                alert(`Error: ${result.error || 'Unknown error occurred'}`);
            }
        }
    }, [file, application_url, handleChange]);

    useEffect(() => {
        if (file) {
            handleUpload();
        }
    }, [file, handleUpload]);


    const submit = useSubmit();
    const handleSubmit = async () => {
        const data = {
            formValues: JSON.stringify(formValues),
            tableData: JSON.stringify(tableData)
        }
        // console.log(formValues);
        submit(data, { method: 'POST', encType: "multipart/form-data" })

    }

    useEffect(() => {
        if (actionData?.success) {
            setShowToast(true);
        }
    }, [actionData]);

    useEffect(() => {
        if (showToast) {
            shopify.toast.show(actionData?.message, {
                duration: 3000,
                onDismiss: () => { }
            });
            setShowToast(false);
        }
    }, [showToast, actionData?.message]);
    return (
        <Page
            backAction={{
                content: 'Orders', onAction: async () => {
                    navigate(-1);
                }
            }}
            title={isAdmin ? '' : name}
            primaryAction={{ content: 'Save', onAction: handleSubmit }}
            secondaryActions={[
                {
                    content: 'View your store', icon: PersonalizedTextIcon,
                    onAction: async () => {
                        window.open(`https://${shop.data[0].myshopify_domain}`, "_blank");
                    }
                },
                {
                    content: 'Preview size chart', icon: ViewIcon, onAction: () => {
                        // alert('working')
                        setPreviewEnable((pre) => !pre)
                    }
                },
                {
                    content: 'View size charts', icon: DataTableIcon, onAction: async () => {
                        navigate("/app/dashboard");
                    }
                },
            ]}
        >
            {!isAppEnable && (
                <AppEmbdedBanner addAppBlockId={addAppBlockId} shop={shop} />
            )}
            <Layout>
                <Layout.Section variant="oneHalf">
                    <Card roundedAbove="sm">
                        <div style={{
                            height: `${isAdmin ? '300px' : '220px'}`,
                        }}>
                            <Text as="h2" variant="headingSm">
                                Name
                            </Text>
                            <Box paddingBlockStart="200">
                                <TextField
                                    value={formValues.name}
                                    onChange={(value) => handleChange('name', value)}
                                    type="text"
                                    autoComplete="name"
                                    helpText={
                                        <span>
                                            This name is only visible to you
                                        </span>
                                    }
                                />
                            </Box>
                            {isAdmin && (
                                <InlineDropZone OniconChange={HandleiconChange} icon={icon} />
                            )}
                            {from === 'admin' || isAdmin && (
                                <Box paddingBlockStart="500">
                                    <Text as="h2" variant="headingSm">
                                        Select Category
                                    </Text>
                                    <Select
                                        label="Category"
                                        labelInline
                                        options={Categories}
                                        onChange={handleChangeselect('category')}
                                        value={formValues.category.value}
                                    />
                                </Box>
                            )}

                        </div>
                    </Card>

                </Layout.Section>
                <Layout.Section variant="oneThird">

                    <Card roundedAbove="sm">
                        <Text as="h2" variant="headingSm">
                            Status
                        </Text>
                        <Box paddingBlockStart="200">
                            <Select
                                label="Status"
                                labelInline
                                options={options}
                                onChange={(value) => handleChange('status', value)}
                                value={formValues.status}
                            />
                        </Box>
                        <Box paddingBlockStart={400}>
                            {/* <Banner onDismiss={() => { }}>
                                <InlineStack gap="400" wrap={false} blockAlign="center">
                                    <p>
                                        Your size chart is not published. Set the Status to 'Active' to publish the size chart in your store.

                                    </p>
                                </InlineStack>
                            </Banner> */}
                        </Box>
                        {bannerProducts === true && (
                            <Box paddingBlockStart={400}>
                                <Banner tone="warning">
                                    <InlineStack gap="400" wrap={false} blockAlign="center">

                                        <p>
                                            Link this size chart to at least one product or collection to activate it
                                        </p>
                                    </InlineStack>
                                </Banner>
                            </Box>
                        )}
                    </Card>
                </Layout.Section>

                <Layout.Section variant="fullWidth">
                    <Card roundedAbove="sm">
                        <BlockStack gap="200">
                            <InlineGrid columns="1fr auto">
                                <Text as="h2" variant="headingSm">
                                    Link to products
                                </Text>
                                <Link target="_blank" removeUnderline={true}>Learn More </Link>
                            </InlineGrid>
                            {bannerProducts === true && (
                                <Box paddingBlockStart={400}>
                                    <Banner tone="warning">
                                        <InlineStack gap="400" wrap={false} blockAlign="center">

                                            <p>
                                                Link this size chart to at least one product or collection to activate it
                                            </p>
                                        </InlineStack>
                                    </Banner>
                                </Box>
                            )}
                            <BlockStack gap="400">
                                <Box paddingBlockStart={200} paddingBlockEnd={500}>
                                    <Text as="p" variant="bodyMd">
                                        Select the products or collections where you want your size chart to appear. You can select one, two or as many as you like.
                                    </Text>
                                </Box>

                                <Box paddingBlockEnd={200}>
                                    <InlineStack align="space-between" direction={"row"} gap={"400"}>
                                        <InlineStack align="space-between" blockAlign="start" direction={"row"} gap={"400"}>
                                            {linkedProducts.length > 0 && (
                                                <div onClick={showLinkedItems} style={{ cursor: 'pointer' }}>
                                                    <Badge tone="attention" >{linkedProducts.length} Linked products</Badge>
                                                </div>
                                            )}
                                            {linkedCollections.length > 0 && (
                                                <div onClick={showLinkedItems} style={{ cursor: 'pointer' }}>
                                                    <Badge tone="attention" onClick={showLinkedItems}>{linkedCollections.length} Linked collections</Badge>
                                                </div>
                                            )}
                                        </InlineStack>
                                    </InlineStack>
                                </Box>
                                <Box>
                                    <Bleed marginInlineStart={"800"} marginInlineEnd={"800"}>
                                        <Divider />
                                    </Bleed>
                                </Box>
                            </BlockStack>
                            <BlockStack gap="200">
                                <Text as="h3" variant="headingSm" fontWeight="medium">
                                    Note
                                </Text>
                                {/* <Text as="p" variant="bodyMd">
                                    The sales reports are available only if your store is on the Shopify
                                    plan or higher.
                                </Text> */}
                                <InlineStack align="space-between">
                                    <ButtonGroup gap="tight">

                                        <Button onClick={handleProductSelection} loading={loading} accessibilityLabel=" Select Products" icon={ProductIcon}>
                                            Select Products
                                        </Button>
                                        <Button
                                            onClick={handleCollectionSelection}
                                            icon={CollectionIcon}
                                            accessibilityLabel=" Select collections"
                                        >
                                            Select collections
                                        </Button>
                                    </ButtonGroup>
                                    <Button textAlign="end" onClick={showLinkedItems} icon={MaximizeIcon}>{showlinked ? 'Hide Linked Items' : 'Show Linked Items'}</Button>
                                </InlineStack>
                                {showlinked && (
                                    <ShowLinkedItems linkedCollections={linkedCollections} linkedProducts={linkedProducts} />
                                )}
                            </BlockStack>
                        </BlockStack>
                    </Card>
                </Layout.Section>
                <Layout.Section variant="fullWidth">
                    <Card roundedAbove="sm">
                        <BlockStack gap="400">
                            <InlineGrid columns="1fr auto">
                                <Text as="h2" variant="headingSm">
                                    Size chart
                                </Text>
                                <Link target="_blank" removeUnderline={true}>Learn More </Link>
                            </InlineGrid>

                            <InlineStack align="space-between" direction={"row"} gap={"400"}>
                                <Box>
                                    <InlineStack align="space-around" direction={"row"} wrap="wrap" gap={400}>
                                        <Button onClick={() => { addColumn() }} accessibilityLabel="Column" icon={PlusCircleIcon}>
                                            Column
                                        </Button>
                                        <Button
                                            onClick={() => { addRow() }}
                                            icon={PlusCircleIcon}
                                            accessibilityLabel=""
                                        >
                                            Row
                                        </Button>

                                    </InlineStack>
                                </Box>
                                <InlineStack align="space-between" direction={"row"} wrap="wrap" gap={400}>
                                    <Button onClick={() => { }} accessibilityLabel="Tips" icon={AlertCircleIcon}>
                                        Tips
                                    </Button>
                                    <Button
                                        onClick={() => { }}
                                        icon={ResetIcon}
                                        tone="critical"
                                        accessibilityLabel="Clear content"
                                    >
                                        Clear content
                                    </Button>

                                </InlineStack>
                            </InlineStack>
                            <Box>
                                <SizeChartTable columns={columns} tableData={tableData} setColumns={setColumns} setTableData={setTableData} handleContentChange={handleContentChange} addRow={addRow} addColumn={addColumn} />
                            </Box>
                            <BlockStack gap={400}>
                                <Text as="p" variant="bodySm">Allow your customers to switch between centimeters or inches depending on their personal preference.
                                </Text>

                                <Box paddingBlockStart={400} paddingBlockEnd={400}>
                                    <InlineGrid columns={5} gap="400">
                                        <Box>
                                            <Select
                                                label="Add Switch"
                                                id="switchsize"
                                                options={sizeoptions}
                                                onChange={(value) => handleChange('allow_converter', value)}
                                                value={formValues.allow_converter}
                                            />
                                        </Box>

                                        {formValues.allow_converter === 'true' && (
                                            <>
                                                <Box>
                                                    <Select
                                                        label="Values entered in:"
                                                        id="lablechange"
                                                        options={lablechangeoptions}
                                                        onChange={(value) => handleChange('allow_converter_in', value)}
                                                        value={formValues.allow_converter_in}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Select
                                                        label="Rounding"
                                                        options={[
                                                            { label: 'Automatic', value: 'auto' },
                                                            { label: 'Custom', value: 'custom' },
                                                        ]}
                                                        onChange={(value) => handleChange('rounding_mode', value)}
                                                        value={formValues.rounding_mode}
                                                    />
                                                </Box>
                                            </>
                                        )}

                                        {formValues.rounding_mode === 'custom' && (
                                            <>
                                                <Box>
                                                    <Select
                                                        label="Number of decimals"
                                                        options={[
                                                            { label: '1 decimal (0.0)', value: '1' },
                                                            { label: '2 decimal (0.00)', value: '2' },
                                                        ]}
                                                        onChange={(value) => handleChange('rounding_numOfDecimals', value)}
                                                        value={formValues.rounding_numOfDecimals}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Select
                                                        label="Round to"
                                                        options={[
                                                            { label: '0.1', value: '0.1' },
                                                            { label: '0.5', value: '0.5' },
                                                        ]}
                                                        onChange={(value) => handleChange('rounding_roundTo', value)}
                                                        value={formValues.rounding_roundTo}
                                                    />
                                                </Box>

                                            </>
                                        )}

                                    </InlineGrid>
                                </Box>
                                <Box paddingBlockStart={400} paddingBlockEnd={400}>
                                    <Banner>
                                        To remove the conversion in a column, add ** inside the title of the column (US Size**, EU Size**) <Link>See examples</Link>
                                    </Banner>
                                </Box>
                            </BlockStack>
                        </BlockStack>

                    </Card>
                </Layout.Section>
                <Layout.Section variant="fullWidth">
                    <Card roundedAbove="sm">
                        <BlockStack gap="200">
                            <InlineGrid columns="1fr auto">
                                <Text as="h2" variant="headingSm">
                                    Measurement instructions
                                </Text>
                            </InlineGrid>

                            <InlineGrid columns={['oneThird', 'twoThirds']} gap="400">
                                <Card roundedAbove="sm" padding={200} gap="200">
                                    <Box padding={400}>
                                        <BlockStack gap={400}>
                                            <DropZoneFileUploads ismodel={true}
                                                onFileChange={handleFileChange}
                                                onClear={handleClear}
                                                file={file}
                                                chartImages={chartImages}
                                                selectImage={selectImage}
                                                setSelectImage={setSelectImage} />
                                        </BlockStack>
                                    </Box>

                                </Card>
                                <Card roundedAbove="sm" padding={200}>
                                    <Box padding={400}>
                                        <Editor handleChange={handleChange} EditorContent={formValues.content} />
                                    </Box>
                                </Card>
                            </InlineGrid>
                        </BlockStack>
                    </Card>
                </Layout.Section>

                {PreviewEnable && (
                    <Layout.Section variant="fullWidth">
                        <PreviewChart PreviewEnable={PreviewEnable} setPreviewEnable={setPreviewEnable} chartValue={formValues} tableData={tableData} shopSettings={shopSettings} />
                    </Layout.Section>
                )}
            </Layout>

            <PageActions
                primaryAction={{ content: 'Save', onAction: handleSubmit }}
            />
        </Page >
    )
}

export default Createsizechart

