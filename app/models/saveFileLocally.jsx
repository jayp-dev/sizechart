import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';  // Use UUID for unique file naming

export async function saveFileLocally(base64Data, fileName) {
    try {

        // Define the directory where you want to store the file
        const dirPath = path.join(process.cwd(), 'public/uploads');

        // Ensure the directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Extract the file extension and base file name
        const fileExtension = path.extname(fileName);
        const baseFileName = path.basename(fileName, fileExtension);

        // Construct the file path with the original file name
        let uniqueFileName = fileName;
        let filePath = path.join(dirPath, uniqueFileName);

        // If the file already exists, append a UUID to the file name
        if (fs.existsSync(filePath)) {
            uniqueFileName = `${baseFileName}_${uuidv4()}${fileExtension}`;
            filePath = path.join(dirPath, uniqueFileName);
        }

        // Create a buffer from the Base64 data
        const base64Str = base64Data.split(';base64,').pop();
        const fileBuffer = Buffer.from(base64Str, 'base64');

        // Save the file to the local filesystem
        await fs.promises.writeFile(filePath, fileBuffer);

        // Return the relative path of the saved file
        return uniqueFileName
    } catch (error) {
        return { error: error.message };
    }
} 