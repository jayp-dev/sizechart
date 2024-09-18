import { Banner } from '@shopify/polaris';

function AppEmbeddedBanner({ addAppBlockId, shop, title = "Embed SizePro in your theme", onDismiss }) {
    return (
        <div style={{ marginBlock: '18px' }}>
            <Banner
                title={title}
                action={{
                    content: 'Embed App',
                    target: "_blank",
                    url: shop?.data?.[0]?.myshopify_domain
                        ? `https://${shop.data[0].myshopify_domain}/admin/themes/current/editor?context=apps&appEmbed=${addAppBlockId}&template=product`
                        : '#' // Fallback URL if `shop` data is missing
                }}
                secondaryAction={{ content: 'Learn more' }}
                tone="warning"
                onDismiss={onDismiss ? onDismiss : () => { console.log('Banner dismissed') }}
            >
                <p>Make sure you know how these changes affect your store.</p>
            </Banner>
        </div>
    );
}

export default AppEmbeddedBanner;
