import {
  useShow,
  Show,
  Typography,
  IResourceComponentsProps,
  ImageField,
  Tag,
  InputNumber,
} from '@pankod/refine';

import { IReceipt } from '@interfaces';

const { Title, Text } = Typography;

export const ReceiptShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IReceipt>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={3}>Name</Title>
      <Text>{record?.name}</Text>
      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>
      <Title level={5}>Notes</Title>
      <Text>{record?.notes || '-'}</Text>
      <Title level={5}>Receipt</Title>
      {record?.attachments?.map((file) => (
        <ImageField key={file?.id} value={file.url} title={file.filename} />
      ))}
      <Title level={5}>Official Name</Title>
      <Text>{record?.officialName}</Text>
      <Title level={5}>Total</Title>
      <InputNumber value={record?.total} step="0.01" readOnly />
    </Show>
  );
};
