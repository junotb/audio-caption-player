import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { statSync, createReadStream } from 'fs';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const file = body.get('file');

  if (typeof file !== 'string' || file.trim() === '') {
    return new NextResponse('Missing file name', { status: 400 });
  }

  // ===== MIME 타입 결정 =====
  const ext = path.extname(file).toLowerCase();
  let contentType = 'application/octet-stream';

  switch (ext) {
    case '.m4a':
      contentType = 'audio/mp4';
      break;
    case '.mp3':
      contentType = 'audio/mpeg';
      break;
    case '.vtt':
      contentType = 'text/vtt';
      break;
  }

  // ===== 파일 경로 설정 (보안 주의: sanitize 필요) =====
  const safeFileName = path.basename(file); // 디렉터리 트래버설 방지
  const filePath = path.join(process.cwd(), 'public', safeFileName);

  try {
    const stat = statSync(filePath);
    const fileStream = createReadStream(filePath);

    return new NextResponse(fileStream as any, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': stat.size.toString(),
        'Access-Control-Allow-Origin': '*', // CORS 허용
      },
    });
  } catch (err) {
    return new NextResponse('File not found', { status: 404 });
  }
}