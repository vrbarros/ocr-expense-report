import { useForm, Edit, Form, Input, Select } from '@pankod/refine';
import { IReceipt } from '@interfaces';

export const ReceiptEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IReceipt>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
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
      </Form>
    </Edit>
  );
};
