
import { json, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Badge, BlockStack, Box, Button, Text, Card, InlineGrid, Grid } from "@shopify/polaris";
import styles from "../styles/welcome.module.css"
import HelpDeskMessage from "../components/HelpDeskMessage";
import IntroVideo from "../components/IntroVideo";
import Footer from "../components/Footer";
import { GetAppEnable, GetWelscreenData, Getstarted, updatewelcomescreen } from "../models/WelcomeScreen";
import { useEffect, useState } from "react";
import { getShopFromRequestSettings } from "../models/ShopSettings";

export const loader = async ({ request }) => {
  const extensionId = process.env.SHOPIFY_SIZECHARTPRO_ID;
  const handle = 'SizechartEmbed';
  const addAppBlockId = `${extensionId}/${handle}`;
  const { admin, session } = await authenticate.admin(request);
  const shop = await admin.rest.resources.Shop.all({ session });
  const data = await GetWelscreenData();
  const isAppEnable = await GetAppEnable(admin, session, extensionId);
  const Getstart = await Getstarted(session, isAppEnable);
  await getShopFromRequestSettings(session);
  return { shop, addAppBlockId, data, isAppEnable, Getstart };
};



export async function action({ request, params }) {
  /** @type {any} */
  const data = {
    ...Object.fromEntries(await request.formData())
  }

  try {
    if (data.action === 'update') {
      const updatescreen = await updatewelcomescreen(data);
      if (updatescreen != null) {
        return json({ success: true, updatescreen: 'Screen updated successfully' })
      }
      return json({ error: 'Something went wrong ' })
    }
    return null
  } catch (error) {
    console.error("Error performing action:", error);
    return json({ error: error.message }, { status: 500 });
  }
}

export default function Index() {
  const { shop, addAppBlockId, isAppEnable, Getstart } = useLoaderData();
  const [introduction, setIntroduction] = useState(Getstart.GettingStart);
  const [showToast, setShowToast] = useState(false);
  const actionData = useActionData();
  const submit = useSubmit();
  useEffect(() => {
    if (actionData?.success) {
      setShowToast(true);
      setIntroduction((Active) => !Active)
    }
  }, [actionData]);


  useEffect(() => {
    if (showToast) {
      shopify.toast.show('Screen Updated Successfully', {
        duration: 3000,
        onDismiss: () => { }
      });
      setShowToast(false);
    }
  }, [showToast]);
  const updateGetstart = () => {
    const data = {
      sessionId: Getstart.sessionId,
      GettingStart: !Getstart.GettingStart,
      EmbedApp: isAppEnable,
      action: 'update',
    };

    submit(data, { method: "post" });
  };


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
                  Enable app <Badge tone={isAppEnable ? 'success' : ''}> {isAppEnable ? 'ON' : 'Off'} </Badge>
                </Text>
                <Button
                  target="_blank"
                  url={`https://${shop.data[0].myshopify_domain}/admin/themes/current/editor?context=apps&appEmbed=${addAppBlockId}&template=product`}
                  accessibilityLabel="Enable"
                  variant="primary"
                >
                  {isAppEnable ? 'Disable' : 'Enable'}

                </Button>
              </InlineGrid>
              <Text as="p" variant="bodyMd">
                Enable the app in your theme editor now to display your size chart on the storefront
              </Text>
            </BlockStack>
          </Card>
        </Grid.Cell>
        {introduction && (
          <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
            <IntroVideo updateGetstart={updateGetstart} />
          </Grid.Cell>
        )}
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