import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_BUCKET;

export async function getUploadUrl(key: string, mime: string) {
  if (!region || !bucket) return null;

  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
    endpoint: process.env.AWS_ENDPOINT,
  });

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: mime,
  });

  return getSignedUrl(client, command, { expiresIn: 60 * 5 });
}
