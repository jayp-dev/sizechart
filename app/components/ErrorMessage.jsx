import { Banner, Card, Page } from '@shopify/polaris';
export function ErrorMessage({ title, description }) {
    return (
        <Page>
            <Card sectioned>
                <Banner
                    title={title || "Error"}
                    status="critical"
                >
                    <p>{description || "Something went wrong. Please try again."}</p>
                </Banner>
            </Card>
        </Page>
    );
}
