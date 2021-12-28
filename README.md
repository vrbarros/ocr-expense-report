# OCR Expense Report

🔬 Study project from FIAP MBA Software Engineer phase 3. OCR with open-source lib to extract information from invoices for expense reports.

# Problem

Currently, the company has an OCR (Optical Character Recognition) solution that successfully performs OCR on traditional documents with a white background and dark characters. This solution works offline, without the need to consult third-party services.

During the development of a new project for a corporate reimbursement platform, the software proved ineffective in reading hypermarket tax coupons. As most tax receipts have noise levels (poorly printed and defective regions), yellow background, in addition to the possible existence of image alignment errors, the technology currently used was ineffective, as it was unable to work with this type of noise , as it was modeled for traditional documents.

Therefore, adjustments need to be made so that it is possible to perform this type of task, improving computer vision techniques for handling noise and OCR.

The objective of the task is to implement a solution that addresses the OCR of tax coupons and extracts from the text obtained the information listed in the customer's needs. The OCR process should preferably be done offline, that is, without using third-party cloud services and the use of opensource libraries is allowed (and recommended) for image manipulation, OCR and extracting information in the text . Students are free to research and use their creativity to solve the problem.

The software needs to be trained to obtain information on tax receipts of various types and that are not in ideal conditions for reading, such as shadow, low light, brightness, etc.

# Solution

Infrastructure
- [x] Deploy on the application server at Vercel
- [x] Integration with Airtable
- [x] Integration with S3 for uploading images

Application
- [x] Installation of Boilerplate Refine
- [x] Listing and Exclusion Page
- [x] Creation page
- [x] Edit page
- [x] Details page
- [] Text extraction by OCR
- [] Save extracted content in Markdown table format

Others
- [] Authentication
- [] Expense report build
- [] E-mail expense report

# Getting Started

## Airtable

- Get your API key in your [account page](https://airtable.com/account), generating a new API key if necessary. Add to NEXT_PUBLIC_AIRTABLE_API_TOKEN variable at your .env file.
- Get your base ID from your table at Airtable [API page](https://airtable.com/api). Add to NEXT_PUBLIC_AIRTABLE_BASE_ID variable at your .env file.

# Authors

- Victor Barros
- Chong Chung Lan
