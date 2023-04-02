import { Form, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";
import { EditableCell } from "./EditableCell";

type Props<Item> = {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
  columns: {
    title: string;
    dataIndex: string;
    width?: string;
    editable?: boolean;
    render?: (_: any, record: Item) => JSX.Element;
  }[];
};

/**
 * A simple editable table that takes in the datasource and the columns as props
 */
const EditableTable = <Item extends { key: string }>({
  data,
  setData,
  columns,
}: Props<Item>) => {
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState<string>("");
  const isEditing = (record: Item) => editingKey === record.key;

  const edit = (record: Partial<Item> & { key: string }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // adding action handler
  const actionHandler = [
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = [...columns, ...actionHandler].map((col) => {
    if (!("editable" in col) || !col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
