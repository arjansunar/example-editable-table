import React from "react";
import "./App.css";
import EditableTable from "./EditableTable";

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
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
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
];

const App: React.FC = () => {
  // const { editingKey, setEditingKey, isEditing } =
  //   useContext(EditableTableContext);
  //
  return (
    <div>
      <EditableTable<Item> originData={originData} columns={columns} />
      <EditableTable<Item2> originData={originData2} columns={columnsDiff} />
    </div>
  );
};

export default App;
