import React, { useDeferredValue, useMemo, useState } from "react";
import "./App.css";
import EditableTable from "./EditableTable";
import { Input } from "antd";

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
const originData: Item[] = [];
for (let i = 0; i < 1000; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}asdfsfdsdf`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const originData2: Item2[] = [];
for (let i = 0; i < 10; i++) {
  originData2.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    extra: true,
    address: `London Park no. ${i}`,
  });
}

const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
    editable: true,
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
    editable: true,
  },
  {
    title: "address",
    dataIndex: "address",
    width: "40%",
    editable: true,
  },
];

const columnsDiff = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
    editable: true,
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
    editable: true,
  },
  {
    title: "address",
    dataIndex: "address",
    width: "40%",
    editable: false,
    new: true,
  },
  {
    title: "extra",
    dataIndex: "extra",
    editable: false,
    render: (extra: boolean) => (extra ? "yes" : "no"),
  },
];

const App: React.FC = () => {
  // const { editingKey, setEditingKey, isEditing } =
  //   useContext(EditableTableContext);
  //
  const [searchKey, setSearchKey] = useState<string>("");
  const deferredKey = useDeferredValue(searchKey);

  const [data, setData] = useState(originData);

  const filteredList = useMemo(
    () =>
      data.filter((el) =>
        el.name.toLowerCase().includes(deferredKey.toLowerCase())
      ),
    [deferredKey]
  );
  console.log({ filteredList });
  return (
    <div>
      <Input
        value={searchKey}
        onChange={(el) => setSearchKey(el.target.value)}
      />
      <EditableTable<Item>
        data={filteredList}
        setData={setData}
        columns={columns}
      />
      {/* <EditableTable<Item2> originData={originData2} columns={columnsDiff} /> */}
    </div>
  );
};

export default App;
