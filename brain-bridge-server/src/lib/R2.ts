import {
  S3Client,
  // ListBucketsCommand,
  // ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { File } from "buffer";
import invariant from "tiny-invariant";
import fetch from 'node-fetch';

invariant(process.env.R2_USER_FILES_BUCKET)
invariant(process.env.R2_ACCOUNT_ID)
invariant(process.env.R2_API_KEY)
invariant(process.env.R2_API_SECRET)

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_API_KEY,
    secretAccessKey: process.env.R2_API_SECRET
  },
});

async function getSignedUrlForUpload(key: string, bucketName: string = process.env.R2_USER_FILES_BUCKET!) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: "application/json",
  });
  return getSignedUrl(S3, command, { expiresIn: 3600 });
}

async function getSignedUrlForRetrieval(key: string, bucketName: string = process.env.R2_USER_FILES_BUCKET!) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  return getSignedUrl(S3, command, { expiresIn: 3600 });
}

async function uploadFile(presignedUrl: string, file: File) {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
  });
  return response;
}

const R2 = {
  getSignedUrlForUpload,
  getSignedUrlForRetrieval,
  uploadFile

}

export default R2;
