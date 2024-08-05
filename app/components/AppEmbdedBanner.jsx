import { Banner } from "@shopify/polaris"

function AppEmbdedBanner() {
    return (
        <div style={{ marginBlock: '18px' }}>
            <Banner title="Embed SizePro in your theme"
                action={{ content: 'Embed App', url: '' }}
                secondaryAction={{ content: 'Learn more' }}
                tone="warning"
                onDismiss={() => { }}>
                <p>Make sure you know how these changes affect your store.</p>
            </Banner>
        </div>
    )
}

export default AppEmbdedBanner
