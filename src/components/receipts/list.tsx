import {
  List,
  Table,
  useTable,
  IResourceComponentsProps,
  GetListResponse,
  Space,
  EditButton,
  ShowButton,
  DeleteButton,
} from '@pankod/refine';

import { IReceipt } from '@interfaces';

export const ReceiptList: React.FC<
  IResourceComponentsProps<GetListResponse<IReceipt>>
> = ({ initialData }) => {
  const { tableProps } = useTable<IReceipt>({
    queryOptions: {
      initialData,
    },
  });

  return (
    <List title="Receipts">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="notes" title="Notes" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column<IReceipt>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
