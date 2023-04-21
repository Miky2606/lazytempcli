import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

const configs = {
  Endpoint: process.env.ENDPOINT,
  Bucket: process.env.BUCKET,
};

const REGION = "us-east-1";
const s3Client = new S3Client({
  forcePathStyle: false,
  // Configures to use subdomain/virtual calling format.
  endpoint: `https://${configs.Endpoint}`,
  region: REGION,

  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
  },
});

export default {
  Endpoint: configs.Endpoint,
  Bucket: configs.Bucket,
  s3Client,
};
