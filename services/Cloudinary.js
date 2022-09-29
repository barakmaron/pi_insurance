import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_IMAGE_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_IMAGE_API_KEY, 
    api_secret: process.env.NEXT_PUBLIC_IMAGE_API_SECRET
  });

export default cloudinary;