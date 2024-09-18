export async function ImageSaveInApp(ImageId) {
    const image = ImageId;
    const data = { id: image }
    try {
        const response = await fetch('/api/imageupload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            return { success: true, data: result, status: 200 };
        } else {
            return { success: false, error: result.error, status: 500 };
        }
    } catch (error) {
        return { success: false, error: error.message, status: 500 };
    }

}
