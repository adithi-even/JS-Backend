import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; //is the "file system" inside the node.js this helps in read, write, remove and will help to maintain the full file system

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null ;   
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        //file has been uploaded successfully 
        console.log("file has been uploaded successfully ", response.url);
        return response ;

    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
        //so basically there is no jargon which is gonna say to delete the file rather it will have methods like link or unlink and when we dont want hte uploaded file then we can just unlink the file in the file system , so in any "file system " documentation 
        return null;
    }
}


export {uploadOnCloudinary};

//understood the whole cloudinary 