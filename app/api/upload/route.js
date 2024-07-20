import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const uploadDir = path.join(process.cwd(), 'public/assets/images');

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error ensuring directory exists: ${error}`);
  }
}

export async function POST(req) {
  await ensureDir(uploadDir);

  if (!req.headers.get('content-type')?.startsWith('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const documentfile = formData.get('documentfile');
    const imageName = formData.get('imageName');
    const documentfilename = formData.get('documentfilename');

    const fileWrites = [];

    if (file && imageName) {
      const filePath = path.join(uploadDir, imageName);
      fileWrites.push(writeFile(filePath, Buffer.from(await file.arrayBuffer())));
      console.log(`File saved as ${imageName}`);
    }

    if (documentfile && documentfilename) {
      const documentPath = path.join(uploadDir, documentfilename);
      fileWrites.push(writeFile(documentPath, Buffer.from(await documentfile.arrayBuffer())));
      console.log(`Document saved as ${documentfilename}`);
    }

    await Promise.all(fileWrites);
    console.log('Files uploaded successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing files:', error);
    return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
  }
}

export const runtime = 'nodejs';
