import { useEffect, useState } from "react";

import InventoryForm from "../components/InventoryForm";
import TransactionTable from "../components/TransactionTable";

import {
  getTransactions,
} from "../api/inventory";

function InventoryPage() {
  const [transactions, setTransactions] =
    useState<any[]>([]);

  const loadTransactions =
    async () => {
      try {
        const data =
          await getTransactions();

        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Inventory
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <InventoryForm
          type="PURCHASE"
          onSuccess={loadTransactions}
        />

        <InventoryForm
          type="SALE"
          onSuccess={loadTransactions}
        />
      </div>

      <TransactionTable
        transactions={transactions}
      />
    </>
  );
}

export default InventoryPage;