import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function AdditionalPage() {
  return (
    <Page>
      <TitleBar title="Additional page" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;NavMenu&gt;</Code> component found
                in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}



// // src/example.tsx
// import * as React from 'react';
// import { Form, useActionData, useLoaderData } from '@remix-run/react';
// import { ActionFunction, json, LoaderFunction } from '@remix-run/node';

// type LoaderData = {
//   message: string;
// };

// type ActionData = {
//   message: string;
// };

// export const loader: LoaderFunction = async () => {
//   return json({ message: 'Hello, Remix!!!' });
// };

// export const action: ActionFunction = async ({
//   request,
// }: {
//   request: Request;
// }) => {
//   const fd = await request.formData();
//   const message = fd.get('message') ?? 'No message provided';
//   console.log({ message });

//   return json({ message });
// };

// const AdditionalPage = () => {
//   const data = useLoaderData<LoaderData>();
//   const actionData = useActionData<ActionData>();

//   return (
//     <div>
//       <h1>{data.message}</h1>
//       <h3>{actionData?.message}</h3>
//       <Form method="post">
//         <input type="text" name="message" placeholder="Type a message..." />
//         <button type="submit">Submit</button>
//       </Form>
//     </div>
//   );
// };

// export default AdditionalPage;