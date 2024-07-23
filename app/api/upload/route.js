import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
  endpoint: 'https://blr1.digitaloceanspaces.com',
  region: 'blr1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

export async function POST(req: NextRequest) {
  if (!req.headers.get('content-type')?.startsWith('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    const documentfile = formData.get('documentfile') as Blob;
    const imageName = formData.get('imageName') as string;
    const documentfilename = formData.get('documentfilename') as string;

    const fileUploads = [];

    if (file && imageName) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const params = {
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: imageName,
        Body: buffer,
        ACL: 'public-read',
        ContentType: file.type,
      };
      const command = new PutObjectCommand(params);
      fileUploads.push(s3.send(command));
      console.log(`File saved as ${imageName}`);
    }

    if (documentfile && documentfilename) {
      const arrayBuffer = await documentfile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const params = {
        Bucket: process.env.DO_SPACES_BUCKET!,
        Key: documentfilename,
        Body: buffer,
        ACL: 'public-read',
        ContentType: documentfile.type,
      };
      const command = new PutObjectCommand(params);
      fileUploads.push(s3.send(command));
      console.log(`Document saved as ${documentfilename}`);
    }

    await Promise.all(fileUploads);
    console.log('Files uploaded successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
  }
}

export const runtime = 'nodejs';
