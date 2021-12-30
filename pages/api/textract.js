import {
  TextractClient,
  AnalyzeExpenseCommand,
} from '@aws-sdk/client-textract';

export default async function handler(req, res) {
  const textractConfiguration = {
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET,
    },
    region: process.env.AWS_S3_REGION,
  };

  const { Bucket, Name } = req.body;

  const client = new TextractClient(textractConfiguration);
  const command = new AnalyzeExpenseCommand({
    Document: {
      S3Object: { Bucket, Name },
    },
  });

  client
    .send(command)
    .then((data) => {
      return res.status(200).json(data.ExpenseDocuments[0]);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}
