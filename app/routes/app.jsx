import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";
import { useEffect, useState } from "react";
import LoadingSvg from "../components/LoadingSvg";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {

  const { session } = await authenticate.admin(request);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "", session });
};

export default function App() {
  const { apiKey, session } = useLoaderData();
  const data = useLoaderData();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // After the loader finishes, set loading to false
    setIsLoading(false);
    console.log("Data loaded, setting loading to false");
  }, [data]);
  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/templates?from=linked_products">Templates</Link>
        <Link to="/app/dashboard">Size charts</Link>
        <Link to="/app/linkedproducts">Linked products</Link>
        <Link to="/app/settings">Settings</Link>
        {session.shop === 'gifting4.myshopify.com' && (
          <>
            <Link to="/app/templates?from=admin">Admin Templates</Link>
            <Link to="/app/createcategory">Create category</Link>
            <Link to="/app/createsizechart/admin">Create sizechart</Link>
            <Link to="/app/icons/admin">Create icons</Link>
          </>
        )}
      </NavMenu>
      {isLoading ? <LoadingSvg /> : <Outlet />} {/* Show loader while loading */}

    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
