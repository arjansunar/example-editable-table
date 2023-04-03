import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import "./App.css";
import EditableTable, { EditableColumnType } from "./EditableTable";
import { Input, TableColumnType } from "antd";
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

const inventoryColumn: EditableColumnType<KeyAdded<Inventory>>[] = [
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
): KeyAdded<T>[] =>
  objList.map((obj) => {
    return { ...obj, key: String(obj.id) };
  });

const globalFilterdata = <T,>(
  dataList: T[],
  columns: EditableColumnType<T>[],
  searchKey: string
) => {
  const trimmedKey = searchKey.trim();
  if (!trimmedKey) return dataList;
  return dataList.filter((item) =>
    columns.some((columnName) => {
      return item[columnName.dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(trimmedKey.toLowerCase());
    })
  );
};

const App: React.FC = () => {
  // const { editingKey, setEditingKey, isEditing } =
  //   useContext(EditableTableContext);
  //
  const [searchKey, setSearchKey] = useState<string>("");
  const deferredKey = useDeferredValue(searchKey);
  // const [bank, setBank] = useState<Bank[]>();
  // const [employee, setEmployee] = useState<Employee[]>();
  const [inventory, setInventory] = useState<(Inventory & { key: string })[]>(
    [] as (Inventory & { key: string })[]
  );
  // const [store, setStore] = useState<Store[]>();

  // const [data, setData] = useState(originData);

  const filteredInventory = useMemo(
    () =>
      globalFilterdata<KeyAdded<Inventory>>(
        inventory,
        inventoryColumn,
        deferredKey
      ),
    [deferredKey]
  );

  useEffect(() => {
    (async () => {
      // fetch data
      // const { data: bank } = await getBank();
      // const { data: employee } = await getEmployee();
      const { data: inventory } = await getInventory();
      // const { data: store } = await getStore();

      // set data
      // setBank(bank);
      // setEmployee(employee);
      // setStore(store);
      setInventory(addKey(inventory));
    })();
  }, []);
  return (
    <div>
      <Input
        value={searchKey}
        onChange={(el) => setSearchKey(el.target.value)}
        disabled={!inventory}
      />

      <EditableTable<KeyAdded<Inventory>>
        data={!deferredKey.trim() ? inventory : filteredInventory}
        columns={inventoryColumn}
        setData={setInventory}
      />
    </div>
  );
};

export default App;
