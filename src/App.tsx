import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import "./App.css";
import EditableTable from "./EditableTable";
import { Input } from "antd";
import { getBank, getEmployee, getInventory, getStore } from "./api";
import { Bank, Employee, Inventory, Store } from "./type";

export interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}
export interface Item2 {
  key: string;
  name: string;
  age: number;
  extra: boolean;
  address: string;
}
const inventoryColumn: {
  title: string;
  dataIndex: keyof Inventory;
  width?: number | string;
  editable: boolean;
}[] = [
  {
    title: "Stock number",
    dataIndex: "StockNumber",
    width: "25%",
    editable: true,
  },
  {
    title: "Carfax",
    dataIndex: "Carfax",
    width: "15%",
    editable: true,
  },
  {
    title: "Description",
    dataIndex: "Description",
    width: "40%",
    editable: false,
  },
];

type KeyAdded<T> = T & { key: string };
const addKey = <T extends { id: number | string }>(
  objList: T[]
): (T & { key: string })[] =>
  objList.map((obj) => {
    return { ...obj, key: String(obj.id) };
  });

const App: React.FC = () => {
  // const { editingKey, setEditingKey, isEditing } =
  //   useContext(EditableTableContext);
  //
  const [searchKey, setSearchKey] = useState<string>("");
  const deferredKey = useDeferredValue(searchKey);
  const [bank, setBank] = useState<Bank[]>();
  const [employee, setEmployee] = useState<Employee[]>();
  const [inventory, setInventory] = useState<(Inventory & { key: string })[]>(
    [] as (Inventory & { key: string })[]
  );
  const [store, setStore] = useState<Store[]>();

  // const [data, setData] = useState(originData);

  // const filteredList = useMemo(
  //   () =>
  //     data.filter((el) =>
  //       el.name.toLowerCase().includes(deferredKey.toLowerCase())
  //     ),
  //   [deferredKey]
  // );

  useEffect(() => {
    (async () => {
      // fetch data
      const { data: bank } = await getBank();
      const { data: employee } = await getEmployee();
      const { data: inventory } = await getInventory();
      const { data: store } = await getStore();

      // set data
      setBank(bank);
      setEmployee(employee);
      setStore(store);
      setInventory(addKey(inventory));
    })();
  }, []);
  return (
    <div>
      <Input
        value={searchKey}
        onChange={(el) => setSearchKey(el.target.value)}
      />

      <EditableTable<KeyAdded<Inventory>>
        data={addKey(inventory)}
        columns={inventoryColumn}
        setData={setInventory}
      />
    </div>
  );
};

export default App;
