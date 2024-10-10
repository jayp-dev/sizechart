import { useNavigate } from "@remix-run/react"
import { Card, EmptyState } from "@shopify/polaris"

function EmptyStateData({ from }) {
    const navigate = useNavigate();
    console.log(from)
    return (
        <Card>
            <EmptyState
                heading="Manage your category"
                action={{
                    content: 'Settings', onAction: async () => {
                        navigate('/app/settings')
                    }
                }}

                secondaryAction={{
                    content: `${from == 'admin' ? 'Create Category' : 'Go to Homepage'}`,
                    onAction: async () => {

                        navigate(`${from == 'admin' ? '/app/settings' : '/app'}`)
                    }
                }}
                footerContent={
                    <p>
                        No data available {' '}
                    </p>
                }
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
            </EmptyState>
        </Card>
    )
}

export default EmptyStateData
