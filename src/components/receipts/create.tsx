import {
  useForm,
  Create,
  Form,
  Select,
  Input,
  Upload,
  getValueFromEvent,
  useFileUploadState,
  FormProps,
  Progress,
  Typography,
} from '@pankod/refine';
import { IReceipt } from '@interfaces';
import axios from 'axios';
import { useState } from 'react';
import Tesseract from 'tesseract.js';

export const ReceiptCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IReceipt>({
    redirect: 'show',
  });
  const { isLoading, onChange } = useFileUploadState();
  const [isExtracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ocr, setOCR] = useState<any>(null);

  const { form }: FormProps = formProps;

  const ocrExtractor = (imageUrl: string) => {
    Tesseract.recognize(imageUrl, 'por+eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(Math.round(m?.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result: any) => {
        console.log(result);
        setOCR(result);
      });
  };

  const uploadProps = {
    customRequest({
      file,
      onError,
      onProgress,
      onSuccess,
    }: {
      file: any;
      onError?: any;
      onProgress?: any;
      onSuccess?: any;
    }): void {
      axios
        .post('/api/image/upload', {
          fileUid: file.uid,
          fileName: file.name,
          fileType: file.type,
        })
        .then((res) => {
          const { signedRequest, url }: { signedRequest: string; url: string } =
            res.data;

          const options = {
            headers: {
              'Content-Type': file.type,
            },
            onUploadProgress: ({
              total,
              loaded,
            }: {
              total: any;
              loaded: any;
            }) => {
              onProgress(
                { percent: Math.round((loaded / total) * 100).toFixed(2) },
                file
              );
            },
          };

          axios
            .put(signedRequest, file, options)
            .then(({ data: result }) => {
              onSuccess(result, file);

              const values = form?.getFieldsValue();
              form?.setFieldsValue({ ...values, attachments: [{ url }] });

              const image = URL.createObjectURL(file);

              setExtracting(true);
              setProgress(0);
              setOCR(null);

              ocrExtractor(image);
            })
            .catch(onError);

          return {
            abort() {
              console.log('Upload progress is aborted!');
            },
          };
        });
    },
  };

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        disabled: isLoading || !ocr,
      }}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: 'Draft',
                value: 'draft',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Attachments"
          rules={[
            {
              required: true,
            },
          ]}
          name="attachments"
          valuePropName="fileList"
          getValueFromEvent={getValueFromEvent}
        >
          <Upload.Dragger
            name="file"
            listType="picture"
            maxCount={1}
            accept=".png"
            onChange={onChange}
            {...uploadProps}
          >
            <p className="ant-upload-text">
              Drag & drop a receipt in this area
            </p>
          </Upload.Dragger>
        </Form.Item>
        {isExtracting && (
          <Form.Item label="Items">
            {!ocr && <Progress type="circle" percent={progress} />}
            {ocr?.data?.lines?.map((item: any) => (
              <Typography>{item.text}</Typography>
            ))}
          </Form.Item>
        )}
      </Form>
    </Create>
  );
};
