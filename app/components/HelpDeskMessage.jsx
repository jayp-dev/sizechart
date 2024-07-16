import { BlockStack, Button, ButtonGroup, Card, InlineStack, Text } from "@shopify/polaris";

function HelpDeskMessage({ shop_owner }) {
    return (
        <Card roundedAbove="sm">
            <BlockStack gap='200'>
                <Text as="h2" variant="headingSm">Optimize Your Store with Size Chart Pro
                </Text>
                <Text as="p" variant="bodyMd">
                    Ensure a perfect fit for your customers with Size Chart Pro. This tool provides accurate sizing information, helping to reduce returns and increase satisfaction. Add detailed size charts to your product pages to assist shoppers in finding the right size, every time.
                </Text>
                <InlineStack align="left">
                    <ButtonGroup>
                        <Button
                            onClick={() => { }}
                            accessibilityLabel="Enable two-step authentication"
                        >
                            Chat With us
                        </Button>
                        <Button variant="plain">Learn more</Button>
                    </ButtonGroup>
                </InlineStack>
            </BlockStack>
        </Card>
    )
}

export default HelpDeskMessage;
