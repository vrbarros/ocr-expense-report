# OCR Expense Report

🔬 Study project from FIAP MBA Software Engineer phase 3. OCR with to extract information from invoices for expense reports.

# Problem

Currently, the company has an OCR (Optical Character Recognition) solution that successfully performs OCR on traditional documents with a white background and dark characters. This solution works offline, without the need to consult third-party services.

During the development of a new project for a corporate reimbursement platform, the software proved ineffective in reading hypermarket tax coupons. As most tax receipts have noise levels (poorly printed and defective regions), yellow background, in addition to the possible existence of image alignment errors, the technology currently used was ineffective, as it was unable to work with this type of noise , as it was modeled for traditional documents.

Therefore, adjustments need to be made so that it is possible to perform this type of task, improving computer vision techniques for handling noise and OCR.

The objective of the task is to implement a solution that addresses the OCR of tax coupons and extracts from the text obtained the information listed in the customer's needs. The OCR process should preferably be done offline, that is, without using third-party cloud services and the use of opensource libraries is allowed (and recommended) for image manipulation, OCR and extracting information in the text . Students are free to research and use their creativity to solve the problem.

The software needs to be trained to obtain information on tax receipts of various types and that are not in ideal conditions for reading, such as shadow, low light, brightness, etc.

# Solution

**Infrastructure**

- [x] Deploy on the application server at Vercel
- [x] Integration with Airtable
- [x] Integration with S3 for uploading images

**Application**

- [x] Installation of Boilerplate Refine
- [x] Listing and Exclusion Page
- [x] Creation page
- [x] Edit page
- [x] Details page
- [x] Text extraction by OCR
- [x] Save extracted content in Markdown table format

**Others** 

- [ ] Authentication
- [ ] Expense report build
- [ ] E-mail expense report

# Getting Started

This software solution uses the following services and technologies:
- Next.js as React Framework with support to server-side renderer
- Refine interface/solution library to accelerate software development
- Vercel for hosting and CI/CD
- Airtable as database with integrated API's provided
- AWS S3 (storage), IAM (security) and Textract (machine learning)

To run this solution in your local machine:
```
git clone https://github.com/vrbarros/ocr-expense-report.git
```

Create a `.env` file with the following variables:

```
NEXT_PUBLIC_AIRTABLE_API_TOKEN=
NEXT_PUBLIC_AIRTABLE_BASE_ID=
AWS_S3_BUCKET_NAME=
AWS_S3_ACCESS_KEY=
AWS_S3_SECRET=
AWS_S3_USER=
AWS_S3_REGION=
```

You should fill the variables after setting up each one of the services.

## Airtable

- Create a new workspace with a table called `receipts` and the columns
  - name: Text
  - notes: Long text
  - attachments: Attachment
  - status: Single select
  - officialName: Text
  - total: Currency

- Get your API key in your [account page](https://airtable.com/account), generating a new API key if necessary. Add to `NEXT_PUBLIC_AIRTABLE_API_TOKEN` variable at your .env file.
- Get your base ID from your table at Airtable [API page](https://airtable.com/api). Add to `NEXT_PUBLIC_AIRTABLE_BASE_ID` variable at your .env file.

## AWS S3

- Create a new S3 bucket with public read permission
- Set a custom Bucket Policy with the following settings:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PutObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:Put*",
                "s3:Get*"
            ],
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```
- Set a custom CORS settings with the following context:
```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```
- Use your bucket name to set the `AWS_S3_BUCKET_NAME` and AWS region to `AWS_S3_REGION`.


## AWS IAM

- Create a new AWS IAM user with controlled policy for security reasons
- Add Permissions policy to the new user
  - AmazonS3FullAccess
  - AmazonTextractFullAccess
- Generate a new user Access Key and Secret to use with `AWS_S3_ACCESS_KEY` and `AWS_S3_SECRET`
- Set the `AWS_S3_USER` with your username created


## AWS Textract

AWS Textract easily extract text and data from virtually any document.

# How to Run

Using **Yarn** you can run this application locally with:

1. Install application dependencies:

```bash
yarn
```

2. Start the development server:

```bash
yarn dev
```

# References

- [Image Text Conversion](https://www.smashingmagazine.com/2021/06/image-text-conversion-react-tesseract-js-ocr/)

# Authors

- Victor Barros
- Chong Chung Lan
