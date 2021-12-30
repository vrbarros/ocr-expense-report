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
  Spin,
  InputNumber,
} from '@pankod/refine';
import { IReceipt } from '@interfaces';
import axios from 'axios';
import { useState } from 'react';
import getReceiptText from 'src/utils/getReceiptText';

export const ReceiptCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IReceipt>({
    redirect: 'show',
  });

  const { isLoading, onChange } = useFileUploadState();
  const [isExtracting, setExtracting] = useState(false);
  const [ocr, setOCR] = useState<any>(null);

  const [image, setImage] = useState('');

  const { form }: FormProps = formProps;

  const textractPost = (inputS3Object: any) => {
    axios
      .post('/api/textract', inputS3Object)
      .then(({ data: result }) => {
        const transformReceipt = getReceiptText(result.SummaryFields);
        const { officialName, total } = transformReceipt;

        console.log(transformReceipt);

        form?.setFieldsValue({ officialName, total: Number(total) });

        setOCR(transformReceipt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(form?.getFieldsValue());

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
          const {
            signedRequest,
            url,
            textract,
          }: { signedRequest: string; url: string; textract: any } = res.data;

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

              form?.setFieldsValue({ attachments: [{ url }] });

              const image = URL.createObjectURL(file);

              setImage(image);
              setExtracting(true);
              setOCR(null);

              textractPost(textract);
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
          <Form.Item label="Receipt">
            <img src={image} /> {!ocr && <Spin size="large" />}
          </Form.Item>
        )}
        {ocr && (
          <Form.Item
            label="Official Name"
            name="officialName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {ocr && (
          <Form.Item
            label="Total"
            name="total"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber prefix="R$" step="0.01" />
          </Form.Item>
        )}
      </Form>
    </Create>
  );
};
