import fs from 'fs';
import path from 'path';
import { json } from '@remix-run/node';
import { authenticate } from '../shopify.server';
import { v4 as uuidv4 } from 'uuid';

const uploadDir = path.join(process.cwd(), 'public', 'chartimages');

const sanitizeFileName = (filename) => {
    const baseName = filename.split('.')[0];
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric characters with underscores
    return sanitizedBaseName;
};

const generateUniqueFileName = (filename) => {
    const baseName = sanitizeFileName(filename.split('.')[0]);
    const ext = path.extname(filename);
    return `SizePro_${baseName}_${uuidv4()}${ext}`;
};

// Function to check the file status
const checkFileStatus = async (fileId, admin) => {
    const query = `#graphql
    query fileStatus($id: ID!) {
      node(id: $id) {
        ... on File {
          fileStatus
        }
      }
    }`;

    const response = await admin.graphql(query, { variables: { id: fileId } });
    const responseData = await response.json();

    return responseData.data.node.fileStatus;
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file");
    const application_url = formData.get("application_url");

    if (file && file instanceof File) {
        const customFileName = generateUniqueFileName(file.name);

        // Define the full file path with the custom file name
        const filePath = path.join(uploadDir, customFileName);
        const baseName = file.name.split('.')[0];

        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Step 1: Save the file locally
        try {
            fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));
            console.log("File saved successfully as:", customFileName);
        } catch (error) {
            console.error("Error writing file:", error);
            return json({ error: 'Failed to save file locally' }, { status: 500 });
        }

        // Step 2: Upload the file to Shopify
        try {
            const { admin } = await authenticate.admin(request);
            const response = await admin.graphql(
                `#graphql
                mutation fileCreate($files: [FileCreateInput!]!) {
                    fileCreate(files: $files) {
                        files {
                            id
                            fileStatus
                            alt
                            createdAt
                            preview {
                                status
                            }
                        }
                        userErrors {
                            message
                            field
                            code
                        }
                    }
                }`,
                {
                    variables: {
                        files: {
                            alt: `${baseName}`,
                            contentType: "IMAGE",
                            originalSource: `${application_url}/chartimages/${customFileName}`,
                        },
                    },
                }
            );

            const responseData = await response.json();
            if (responseData.data && responseData.data.fileCreate) {
                const resData = responseData.data.fileCreate.files;

                if (resData && resData.length > 0) {
                    const uploadedFile = resData[0];
                    const fileId = uploadedFile.id;

                    // Polling to check if the file is ready
                    let fileStatus = uploadedFile.fileStatus;
                    while (fileStatus === 'UPLOADED' || fileStatus === 'PROCESSING') {
                        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before polling again
                        fileStatus = await checkFileStatus(fileId, admin);
                    }

                    if (fileStatus === 'READY') {
                        fs.unlinkSync(filePath); // Remove the local file
                        return json({
                            message: 'File uploaded and processed successfully',
                            ImageId: fileId,
                            fileStatus: fileStatus
                        });
                    } else {
                        return json({
                            error: `File is in an unexpected status: ${fileStatus}`,
                            ImageId: fileId
                        }, { status: 500 });
                    }
                } else {
                    return json({
                        error: 'No files were returned by Shopify',
                        details: responseData,
                        baseName: customFileName,
                        originalSource: `${application_url}/chartimages/${customFileName}`
                    }, { status: 500 });
                }
            } else {
                return json({
                    error: 'Unexpected response structure from Shopify',
                    details: responseData
                }, { status: 500 });
            }
        } catch (error) {
            console.error(`Error uploading to Shopify: ${filePath}`, error);
            return json({ error: `Failed to upload file to Shopify: ${error.message}` }, { status: 500 });
        }
    } else {
        return json({ error: 'Invalid file' }, { status: 400 });
    }
};
