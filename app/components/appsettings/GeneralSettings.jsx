import { BlockStack, Box, Text } from "@shopify/polaris"
import styles from "../../styles/welcome.module.css"

function GeneralSettings() {
    return (
        <div className="Polaris-Page">
            <BlockStack gap='400'>
                <div style={{
                    width: '200px',
                }} className={styles.custom_padding}>
                    <Box padding="400" width="586px" background="bg">
                        <Text variant="headingMd" as="h3" fontWeight="bold">Settings</Text>
                        <Text variant="bodySm" breakWord={false} alignment="left" as="p" > Test Greetings from Size Chart Pro! We're Here to Ensure You Get the Best Fit 👕 📏</Text>
                    </Box>
                </div>
            </BlockStack>
        </div>
    )
}

export default GeneralSettings

export const links = () => [
    { rel: "stylesheet", href: styles },
]