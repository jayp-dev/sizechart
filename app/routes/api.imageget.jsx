import { json } from "@remix-run/node"
import { authenticate } from "../shopify.server"

export const action = async ({ request }) => {
    const formData = await request.formData();
    const image_id = formData.get("image_id");
    const { admin } = await authenticate.admin(request);
    if (image_id) {
        try {
            const response = await admin.graphql(
                `#graphql
                query GetFileById($id: ID!) {
                  node(id: $id) {
                    ... on MediaImage {
                            id
                            fileStatus
                            image {
                                url
                            }
                        }
                  }
                }`,
                {
                    variables: {
                        id: image_id,
                    },
                }
            );

            const ImageData = await response.json();
            const imageUrl = ImageData.data.node?.image?.url;
            return json({
                message: 'Image fetch successfully',
                imageUrl: imageUrl,
                status: 200,
                success: true,

            });
        } catch (error) {
            return json({ error: `Shopify Image Is not coming : ${error.message}` }, { status: 500 });
        }
    } else {
        return json({ error: `Shopify Image Is not coming` }, { status: 500 });
    }
}