interface TransactionTableProps {
  transactions: any[];
}

function TransactionTable({
  transactions,
}: TransactionTableProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">
        Transaction History
      </h3>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">
              Type
            </th>

            <th className="text-left p-2">
              Product
            </th>

            <th className="text-left p-2">
              Boxes
            </th>

            <th className="text-left p-2">
              Units
            </th>

            <th className="text-left p-2">
              Notes
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b"
            >
              <td className="p-2">
                {transaction.type}
              </td>

              <td className="p-2">
                {transaction.product?.name}
              </td>

              <td className="p-2">
                {transaction.boxQuantity}
              </td>

              <td className="p-2">
                {transaction.unitQuantity}
              </td>

              <td className="p-2">
                {transaction.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;