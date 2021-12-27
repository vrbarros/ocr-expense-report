import {
  useShow,
  Show,
  Typography,
  IResourceComponentsProps,
} from '@pankod/refine';

import { IReceipt } from '@interfaces';

const { Title, Text } = Typography;

export const ReceiptShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IReceipt>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Notes</Title>
      <Text>{record?.notes}</Text>
    </Show>
  );
};
