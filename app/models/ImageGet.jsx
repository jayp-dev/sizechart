export const ImageGet = async (ImageId) => {
    const result_formData = new FormData();
    result_formData.append('image_id', ImageId);

    const image_response = await fetch('/api/imageget', {
        method: 'POST',
        body: result_formData,
    });

    const image_result = await image_response.json();
    if (image_response.ok) {
        console.log(image_result);
    } else {
        alert(`Error: ${image_result.error || 'Unknown error occurred'}`);
    }
}

