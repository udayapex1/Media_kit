import { Router, Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const assertCloudinaryConfig = () => {
  const missing = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ].filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const error: any = new Error(`Missing Cloudinary environment variables: ${missing.join(', ')}`);
    error.status = 500;
    throw error;
  }
};

// Configure multer (memory storage since we upload directly to cloudinary from buffer)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/image', upload.single('image'), asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  assertCloudinaryConfig();

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'media-kit', transformation: [{ width: 800, height: 800, crop: 'limit' }] },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(req.file!.buffer);
    });

    res.json({ url: (result as any).secure_url });
  } catch (error: any) {
    error.status = error.http_code || error.status || 500;
    throw error;
  }
}));

export const uploadRoutes = router;
