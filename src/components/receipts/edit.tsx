import {
  useForm,
  Edit,
  Form,
  Input,
  Select,
  getValueFromEvent,
  useFileUploadState,
  Upload,
  FormProps,
  InputNumber,
} from '@pankod/refine';
import { IReceipt } from '@interfaces';

export const ReceiptEdit: React.FC = () => {
  const { TextArea } = Input;

  const { formProps, saveButtonProps } = useForm<IReceipt>();

  const { isLoading, onChange } = useFileUploadState();

  const { form }: FormProps = formProps;

  return (
    <Edit
      saveButtonProps={{
        ...saveButtonProps,
        disabled: isLoading,
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
                label: 'Published',
                value: 'published',
              },
              {
                label: 'Draft',
                value: 'draft',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <TextArea showCount maxLength={1000} />
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
            disabled
          >
            <p className="ant-upload-text">
              Drag & drop a receipt in this area
            </p>
          </Upload.Dragger>
        </Form.Item>
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
        <Form.Item
          label="Total"
          name="total"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber step="0.01" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
