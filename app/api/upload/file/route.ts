import aws from 'aws-sdk';
import {
  dbConnect,
  UserUtils,
} from '@/server'
import { UnexpectedErrorResponse } from '@/lib'

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

    // const user = await UserUtils.getAuthenticatedUser()
    // if (!user)
    //   return new Response(JSON.stringify({
    //     success: false,
    //     error: 'You are not logged in'
    //   }), {
    //     status: 200
    //   })

    const { fileName, fileType } = (await req.json()) as {
      fileName?: string
      fileType?: string,
      fileSize?: string
    }

    console.log('=====fileName:', fileName, '=======fileType:', fileType)

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
    console.log(`/api/upload/file error: ${e}`)
    return new Response(JSON.stringify(UnexpectedErrorResponse), {
      status: 200
    })
  }
}