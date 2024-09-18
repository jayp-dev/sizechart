import { json } from '@remix-run/node';
import db from '../db.server';
import { authenticate } from '../shopify.server';

export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const { id } = await request.json();
    try {
        const existingRecord = await db.shopImages.findUnique({
            where: { ShopId: session.id }
        });

        let images = existingRecord ? JSON.parse(existingRecord.images || '[]') : [];
        if (!images.some(image => image.id === id)) {
            images.push({ id: id });
        }
        const updatedImages = JSON.stringify(images);
        if (!existingRecord) {
            const CreateRecord = await db.shopImages.create({
                data: { images: updatedImages, ShopId: session.id, }
            });
            return json({ success: true, data: CreateRecord, message: 'Record created successFully' });
        }
        const updatedRecord = await db.shopImages.update({
            where: { ShopId: session.id },
            data: { images: updatedImages }
        });

        return json({ success: true, data: updatedRecord, message: 'Record Updated successFully' });
    } catch (error) {
        console.error("Error updating image IDs:", error);
        return json({ success: false, error: error.message }, { status: 500 });
    }
};
