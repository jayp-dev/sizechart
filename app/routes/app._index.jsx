
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Badge, BlockStack, Box, Text, } from "@shopify/polaris";
import styles from "../styles/welcome.module.css"
export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const shop = await admin.rest.resources.Shop.all({ session });
  return { shop };
};

export default function Index() {
  const { shop } = useLoaderData();
  return (
    <div className="Polaris-Page Polaris-Page--fullWidth">
      <BlockStack gap='400'>
        <div style={{
          width: '200px',
        }} className={styles.custom_padding}>
          <Box padding="400" width="286px" background="bg">
            <Text variant="headingMd" as="h3" fontWeight="bold">Hi {shop.data[0].shop_owner}!</Text>
            <Text variant="bodySm" alignment="left" as="p" >Welcome to Prerna Size Chart 👕 📏</Text>

          </Box>
        </div>
      </BlockStack>
      <div className="Polaris-Page__Content">
        <div className="Polaris-Layout">
          <div className="Polaris-Layout__Section">
            <div className="Polaris-LegacyCard">
              <div className="Polaris-LegacyCard__Header Polaris-LegacyCard__FirstSectionPadding">
                <h2 className="Polaris-Text--root Polaris-Text--headingSm">Enable App <Badge tone="info"> Off</Badge></h2>
              </div>
              <div className="Polaris-LegacyCard__Section Polaris-LegacyCard__LastSectionPadding">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export const links = () => [
  { rel: "stylesheet", href: styles },
]