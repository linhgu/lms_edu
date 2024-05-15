import { columnsAdminPage } from './columns-admin';
import { DataTableAdmin } from './data-table-admin';

export const TableUser = ({ data }: any) => {
  return (
    <div className="p-6 w-full">
      <DataTableAdmin columns={columnsAdminPage} data={data} />
    </div>
  );
};
