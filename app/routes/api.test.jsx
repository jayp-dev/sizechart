// routes/api/test.js
import { json } from '@remix-run/node';

export const loader = async () => {
    // const data = await request.json();
    return json({ message: 'API call was successful!' });
};
export const action = async ({ request }) => {
    const data = await request.json();
    return json({ message: 'API call was successful!', receivedData: data });
};
