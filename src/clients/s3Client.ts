import { PutObjectAclCommand, S3Client } from "@aws-sdk/client-s3"

// exporta o bucket s3
export const s3Client = new S3Client();
