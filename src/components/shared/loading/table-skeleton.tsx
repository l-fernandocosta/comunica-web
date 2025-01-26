import { Card } from "@/components/ui/card";

const TableSkeleton = () => {
  return (
    <Card className="p-4">
      <div className="w-full overflow-hidden rounded-md border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Nome
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                E-mail
              </th>

              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-300"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TableSkeleton;
