import aws from 'aws-sdk';
import {
  dbConnect,
  Users
} from '@/server'
import { verify } from "jsonwebtoken";

export const dynamic = 'force-dynamic'

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const s3 = new aws.S3();

export async function POST(req: Request) {
  try {
    await dbConnect()

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({
        error: 'Invalid authorization header'
      }), {
        status: 401
      })
    }
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET!);

    // Extract the user information from the token payload
    const { userId } = decoded as { userId?: string, email?: string };
    await dbConnect()

    if(!(await Users.findById(userId)))
      return new Response(JSON.stringify({
        success: false,
        error: 'You are not logged in'
      }), {
        status: 200
      })

    const { fileName, fileType } = (await req.json()) as {
      fileName?: string
      fileType?: string
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
      Expires: 180, // Presigned URL expiration time (in seconds)
    };
    const presignedURL = await s3.getSignedUrlPromise('putObject', params);

    return new Response(JSON.stringify({presignedURL, success:true}), {
      status: 200
    })
  } catch (e) {
    console.log(`/api/mobile/upload/file error: ${e}`)
    return new Response(JSON.stringify({
      success: false,
      error: `${e}`
    }), {
      status: 200
    })
  }
}