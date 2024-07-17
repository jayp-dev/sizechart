import { BlockStack, Box, Button, ButtonGroup, Card, Divider, Grid, InlineStack, Link, Text } from "@shopify/polaris"
import React from "react"
import { PlusIcon } from '@shopify/polaris-icons';

function AppCssInformation() {
    return (
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
            <Card roundedAbove="sm">
                <BlockStack gap="500">
                    <Text as="h2" variant="headingSm">
                        Vertical position
                    </Text>
                    <Text as="p" variant="bodyMd">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                    <Button variant="plain" icon={PlusIcon} textAlign="left" external="true">Learn more</Button>
                    <Card roundedAbove="sm">
                        <Text as="h2" variant="headingSm">
                            App block in theme editor
                        </Text>
                        <Box paddingBlockStart="200">
                            <Text as="p" variant="bodyMd">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                        </Box>
                        <InlineStack>
                            <div style={{ paddingTop: '20px' }}>
                                <ButtonGroup>
                                    <Button
                                        icon={PlusIcon}
                                        variant="secondary"
                                        onClick={() => { }}
                                        accessibilityLabel="Create shipping label"

                                    >
                                        Open theme editor
                                    </Button>
                                    <Link url="https://jaipuriageeks.myshopify.com" target="_blank">How to adjust CSS class</Link>
                                </ButtonGroup>
                            </div>

                        </InlineStack>
                    </Card>
                    <Divider />

                    <Text as="h2" variant="headingSm">
                        Horizontal position
                    </Text>
                    <Text as="p" variant="bodyMd">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <div style={{ paddingTop: '20px' }}>
                        <ButtonGroup>
                            <Button
                                icon={PlusIcon}
                                variant="secondary"
                                onClick={() => { }}
                                accessibilityLabel="Create shipping label"

                            >
                                Adjust horizontal position
                            </Button>
                            <Link url="https://jaipuriageeks.myshopify.com" target="_blank">How to adjust position</Link>
                        </ButtonGroup>
                    </div>
                </BlockStack>

            </Card>
        </Grid.Cell>
    )
}

export default AppCssInformation
