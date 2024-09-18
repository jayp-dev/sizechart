import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { json } from '@remix-run/node';
import db from '../db.server'
import { Navigate, redirect, useActionData, useLoaderData, useNavigate, useSubmit } from '@remix-run/react';
import { BlockStack, Card, Frame, IndexTable, Layout, Link, Page, PageActions, Text, TextField, useBreakpoints, useIndexResourceState } from '@shopify/polaris';
import { validateFields } from '../models/sizeCategories.server';
import { DeleteIcon } from '@shopify/polaris-icons';
import invariant from 'tiny-invariant';

export async function loader({ request }) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const pageSize = parseInt(url.searchParams.get("pageSize")) || 5;

    try {
        const totalItems = await db.sizeCategory.count();
        const categories = await db.sizeCategory.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return json({
            categories,
            totalItems,
            page,
            pageSize,
            totalPages: Math.ceil(totalItems / pageSize),
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return json({ error: 'Unable to fetch categories' }, { status: 500 });
    }
}


export async function action({ request, params }) {
    /** @type {any} */
    const data = {
        ...Object.fromEntries(await request.formData()),
    };
    try {
        if (data.action === "delete") {
            let selectedResourcesdata = data.selectedResources;
            invariant(selectedResourcesdata, "Selected resources are required");
            selectedResourcesdata = selectedResourcesdata.split(',').map(Number);
            await db.sizeCategory.deleteMany({
                where: {
                    id: {
                        in: selectedResourcesdata,
                    },
                },
            });
            return redirect('/app/createcategory')
        }

        const errors = validateFields(data);
        if (errors) {
            return json({ errors }, { status: 422 });
        }

        await db.sizeCategory.create({ data });
        return json({ success: true }); // Return success state
    } catch (error) {
        console.error("Error performing action:", error);
        return json({ error: error.message }, { status: 500 });
    }
}
function Createcategory() {
    const actionData = useActionData();
    const { categories, page, pageSize, totalPages } = useLoaderData();
    console.log(actionData);
    const [formState, setFormState] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const handleChange = useCallback(
        (newValue) => setFormState(newValue),
        [],
    );

    const errors = useMemo(() => actionData?.errors || {}, [actionData]);
    const submit = useSubmit();
    function handleSave() {
        const data = {
            name: formState,
        };
        setFormState('');
        submit(data, { method: "post" });

    }

    useEffect(() => {
        if (actionData?.success) {
            setShowToast(true);
        }
    }, [actionData]);

    useEffect(() => {
        if (showToast) {
            shopify.toast.show('Category Create Successfully', {
                duration: 3000,
                onDismiss: () => { }
            });
            setShowToast(false);
        }
    }, [showToast]);

    const handleChangePage = (newPage) => {
        const searchParams = new URLSearchParams(window.location.search);
        console.log(searchParams)
        searchParams.set('page', newPage);
        searchParams.set('pageSize', pageSize);
        navigate(`/app/createcategory?${searchParams.toString()}`);
    };

    const handleDelete = () => {
        const data = {
            selectedResources: selectedResources,
            action: 'delete',
        };
        submit(data, { method: "post", });
    };

    const resourceName = {
        singular: 'category',
        plural: 'categories',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(categories);

    const rowMarkup = categories.map(
        ({ id, name, createdAt, updatedAt }, index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Link
                        dataPrimaryLink
                        url={`/app/categoryedit/${id}`}
                        onClick={() => console.log(`Clicked ${name}`)}
                    >
                        <Text fontWeight="bold" as="span">
                            {name}
                        </Text>
                    </Link>
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {new Date(createdAt).toDateString()}
                </IndexTable.Cell>
                <IndexTable.Cell>
                    {new Date(updatedAt).toDateString()}
                </IndexTable.Cell>

            </IndexTable.Row>
        ),
    );

    const bulkActions = [
        {
            content: 'Edit Category',
            onAction: () => console.log('Todo: implement bulk remove tags'),
        },
        {
            icon: DeleteIcon,
            destructive: true,
            content: 'Delete Category',
            onAction: () => handleDelete(),
        },
    ];

    return (
        <Frame>
            <Page>
                <ui-title-bar title={'Create Category'}>
                    <button variant="breadcrumb" onClick={() => Navigate("/app")}>
                        Category
                    </button>
                </ui-title-bar>
                <Layout>
                    <Layout.Section>
                        <Card>
                            <BlockStack gap={400}>
                                <Text as={"h2"} variant="headingLg">
                                    Title
                                </Text>
                                <TextField
                                    id="name"
                                    helpText="Create Category For Size Chart"
                                    label="title"
                                    labelHidden
                                    autoComplete="off"
                                    value={formState}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                />
                            </BlockStack>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <PageActions
                            primaryAction={{
                                content: 'Save',
                                onAction: handleSave,
                            }}
                        />
                    </Layout.Section>
                </Layout>

                <Layout.Section>
                    <Card padding="0">
                        <IndexTable
                            condensed={useBreakpoints().smDown}
                            resourceName={resourceName}
                            itemCount={categories.length}
                            selectedItemsCount={
                                allResourcesSelected ? 'All' : selectedResources.length
                            }
                            onSelectionChange={handleSelectionChange}
                            headings={[
                                { title: 'Name' },
                                { title: "Date created" },
                                { title: "Date Updated" },

                            ]}
                            bulkActions={bulkActions}
                            pagination={{
                                hasNext: page < totalPages,
                                hasPrevious: page > 1,
                                onPrevious: () => handleChangePage(page - 1),
                                onNext: () => { handleChangePage(page + 1) },
                            }}
                        >
                            {rowMarkup}
                        </IndexTable>
                    </Card>
                </Layout.Section>
            </Page>
        </Frame>
    )
}

export default Createcategory;
