import { Spinner, Page, Card } from "@shopify/polaris";

export function LoadingState() {
    return (
        <Page>
            <Card sectioned>
                <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <Spinner accessibilityLabel="Loading" size="large" />
                </div>
            </Card>
        </Page>
    );
}
