
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Badge, BlockStack, Box, Button, Text, Card, InlineGrid, Grid } from "@shopify/polaris";
import styles from "../styles/welcome.module.css"
import HelpDeskMessage from "../components/HelpDeskMessage";
import IntroVideo from "../components/IntroVideo";
import Footer from "../components/Footer";
export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const shop = await admin.rest.resources.Shop.all({ session });
  return { shop };
};

export default function Index() {
  const { shop } = useLoaderData();
  return (
    <div className="Polaris-Page">

      <BlockStack gap='400'>
        <div style={{
          width: '200px',
        }} className={styles.custom_padding}>
          <Box padding="400" width="586px" background="bg">
            <Text variant="headingMd" as="h3" fontWeight="bold">Hi {shop.data[0].shop_owner}!</Text>
            <Text variant="bodySm" breakWord={false} alignment="left" as="p" >Greetings from Size Chart Pro! We're Here to Ensure You Get the Best Fit 👕 📏</Text>

          </Box>
        </div>
      </BlockStack>
      <Grid columns={{ sm: 3 }}>
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
          <Card roundedAbove="sm">
            <BlockStack gap="200">
              <InlineGrid columns="1fr auto">
                <Text as="h2" variant="headingSm">
                  Enable app <Badge tone="info"> Off</Badge>
                </Text>
                <Button
                  onClick={() => { }}
                  accessibilityLabel="Enable"
                  variant="primary"
                >
                  Enable
                </Button>
              </InlineGrid>
              <Text as="p" variant="bodyMd">
                Enable the app in your theme editor now to display your size chart on the storefront
              </Text>
            </BlockStack>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
          <IntroVideo />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
          <HelpDeskMessage />
        </Grid.Cell>
      </Grid>

      <Footer />
    </div>
  );
}

export const links = () => [
  { rel: "stylesheet", href: styles },
]