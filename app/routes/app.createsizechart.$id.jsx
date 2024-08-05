import { json } from "@remix-run/node"
import { Banner, Bleed, BlockStack, Box, Button, ButtonGroup, Card, Divider, InlineGrid, InlineStack, Layout, Link, Page, PageActions, Select, Text, TextField, } from "@shopify/polaris";
import { useLoaderData } from "react-router";
import { DeleteIcon, PersonalizedTextIcon, ViewIcon, DataTableIcon, ResetIcon, AlertCircleIcon, PlusCircleIcon, CollectionIcon, ProductIcon, MaximizeIcon } from '@shopify/polaris-icons';
import AppEmbdedBanner from "../components/AppEmbdedBanner";
import { useCallback, useState } from "react";
import SizeChartTable from "../components/SizeChartTable";
import Editor from "../components/Editor";
import DropZoneFileUploads from "../components/DropZoneFileUploads";


export const loader = async ({ request, params }) => {

    if (params.id === 'admin') {
        return json({
            response: 'WOrking Fine'
        })
    }

    return json({ response: 'not worknig' });

}
function Createsizechart() {
    const response = useLoaderData();
    // console.log(response);

    const [columns, setColumns] = useState(['']);
    const [tableData, setTableData] = useState([

    ]);

    const handleContentChange = (e, rowIndex, colKey) => {
        const value = e.target.textContent;
        if (rowIndex === null) {
            const newColumns = [...columns];
            const oldColumnName = newColumns[colKey];
            newColumns[colKey] = value;

            const newData = tableData.map(row => {
                const newRow = { ...row };
                newRow[value] = newRow[oldColumnName];
                delete newRow[oldColumnName];
                return newRow;
            });

            setColumns(newColumns);
            setTableData(newData);
        } else {
            const newData = [...tableData];
            newData[rowIndex][columns[colKey]] = value;
            setTableData(newData);
        }
    };

    const addRow = () => {
        const newRow = columns.reduce((acc, column) => {
            acc[column] = '';
            return acc;
        }, {});
        setTableData([...tableData, newRow]);
    };

    const addColumn = () => {
        const newColumn = '';
        setColumns([...columns, newColumn]);
        setTableData(tableData.map(row => ({ ...row, [newColumn]: '' })));
    };

    const [selected, setSelected] = useState('newestUpdate');
    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );
    const options = [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },

    ];


    return (
        <Page
            backAction={{ content: 'Orders', url: '#' }}
            title="Template Classic - Bottom Men"
            primaryAction={{ content: 'Save', disabled: false }}
            secondaryActions={[
                { content: 'View your store', icon: PersonalizedTextIcon },
                { content: 'Preview size chart', icon: ViewIcon },
                { content: 'View size charts', icon: DataTableIcon },
            ]}
        >
            <AppEmbdedBanner />
            <Layout>
                <Layout.Section variant="oneHalf">
                    <Card roundedAbove="sm">
                        <div style={{
                            height: '204px',
                        }}>
                            <Text as="h2" variant="headingSm">
                                Name
                            </Text>
                            <Box paddingBlockStart="200">
                                <TextField
                                    // value={email}
                                    // onChange={handleEmailChange}
                                    // label="Email"
                                    type="email"
                                    autoComplete="email"
                                    helpText={
                                        <span>
                                            This name is only visible to you

                                        </span>
                                    }
                                />
                            </Box>
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
                                onChange={handleSelectChange}
                                value={selected}
                            />


                        </Box>
                        <Box paddingBlockStart={400}>
                            <Banner onDismiss={() => { }}>
                                <InlineStack gap="400" wrap={false} blockAlign="center">
                                    <p>
                                        Your size chart is not published. Set the Status to 'Active' to publish the size chart in your store.

                                    </p>
                                </InlineStack>
                            </Banner>
                        </Box>

                        <Box paddingBlockStart={400}>
                            <Banner tone="warning" onDismiss={() => { }}>
                                <InlineStack gap="400" wrap={false} blockAlign="center">
                                    <p>
                                        Save changes to activate this size chart.
                                    </p>
                                </InlineStack>
                            </Banner>
                        </Box>

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
                            <BlockStack gap="400">
                                <Box paddingBlockStart={200} paddingBlockEnd={500}>
                                    <Text as="p" variant="bodyMd">
                                        Select the products or collections where you want your size chart to appear. You can select one, two or as many as you like.
                                    </Text>
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
                                <Text as="p" variant="bodyMd">
                                    The sales reports are available only if your store is on the Shopify
                                    plan or higher.
                                </Text>
                                <InlineStack align="space-between">
                                    <ButtonGroup gap="tight">
                                        <Button onClick={() => { }} accessibilityLabel=" Select Products" icon={ProductIcon}>
                                            Select Products
                                        </Button>
                                        <Button
                                            onClick={() => { }}
                                            icon={CollectionIcon}
                                            accessibilityLabel=" Select collections"
                                        >
                                            Select Products
                                        </Button>
                                    </ButtonGroup>
                                    <Button textAlign="end" icon={MaximizeIcon}>Show Linked Items</Button>
                                </InlineStack>
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
                                                options={[
                                                    { label: 'Yes', value: true },
                                                    { label: 'No', value: false },
                                                ]}
                                                onChange={handleSelectChange}
                                                value={selected}
                                            />
                                        </Box>
                                        <Box>
                                            <Select
                                                label="Values entered in:"
                                                options={[
                                                    { label: 'Centimeters', value: 1 },
                                                    { label: 'Inches', value: 2 },
                                                ]}
                                                onChange={handleSelectChange}
                                                value={selected}
                                            />
                                        </Box>
                                        <Box>
                                            <Select
                                                label="Rounding"
                                                options={[
                                                    { label: 'Automatic', value: 'auto' },
                                                    { label: 'Custom', value: 'Custom' },
                                                ]}
                                                onChange={handleSelectChange}
                                                value={selected}
                                            />
                                        </Box>
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
                                            <DropZoneFileUploads />

                                        </BlockStack>
                                    </Box>

                                </Card>
                                <Card roundedAbove="sm" padding={200}>
                                    <Box padding={400}>

                                        <Editor />
                                    </Box>
                                </Card>
                            </InlineGrid>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
            <PageActions
                primaryAction={{ content: 'Save', disabled: true }}
                secondaryActions={[{ content: 'Delete', icon: DeleteIcon }]}
            />
        </Page >
    )
}

export default Createsizechart

