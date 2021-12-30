import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export default async function handler(req, res) {
  const s3Configuration = {
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET,
    },
    region: process.env.AWS_S3_REGION,
  };

  const client = new S3Client(s3Configuration);

  const s3Bucket = process.env.AWS_S3_BUCKET_NAME;
  const { fileName, fileType } = req.body;

  const command = new PutObjectCommand({
    Bucket: s3Bucket,
    Key: fileName,
    ResponseContentType: fileType,
  });

  try {
    const data = await getSignedUrl(client, command, { expiresIn: 3600 });

    const returnData = {
      signedRequest: data,
      url: `https://${s3Bucket}.s3.amazonaws.com/${fileName}`,
      textract: {
        Bucket: s3Bucket,
        Name: fileName,
      },
    };

    return res.status(200).json(returnData);
  } catch (err) {
    return res.status(500).json(err);
  }
}
