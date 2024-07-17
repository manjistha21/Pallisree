import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'public/assets/trainee');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = file.fieldname === 'file' ? req.body.imageName : req.body.documentfilename;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const uploadMiddleware = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'documentfile', maxCount: 1 },
]);

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export async function POST(req, res) {
  try {
    console.log('Starting upload middleware');
    await runMiddleware(req, res, uploadMiddleware);
    console.log('Middleware finished processing');

    if (!req.files) {
      throw new Error('No files found in the request');
    }

    const files = req.files;
    const fileFields = ['file', 'documentfile'];

    fileFields.forEach((field) => {
      if (files[field] && files[field][0]) {
        const file = files[field][0];
        const filePath = path.join(uploadDir, file.originalname);
        console.log(`Writing file to ${filePath}`);
        fs.writeFileSync(filePath, file.buffer);
      } else {
        console.log(`No file found for field: ${field}`);
      }
    });

    return res.status(200).json({ data: 'success' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
