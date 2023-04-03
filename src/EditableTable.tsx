import { Form, Popconfirm, Table, TableColumnType, Typography } from "antd";
import React, { Key, useState } from "react";
import { EditableCell } from "./EditableCell";

export interface EditableColumnType<RecordType>
  extends Omit<TableColumnType<RecordType>, "dataIndex"> {
  editable: boolean;
  dataIndex: keyof RecordType;
}

type Props<RecordType> = {
  data: RecordType[];
  setData: React.Dispatch<React.SetStateAction<RecordType[]>>;
  columns: EditableColumnType<RecordType>[];
};

/**
 * A simple editable table that takes in the datasource and the columns as props
 */
const EditableTable = <RecordType extends { key: Key }>({
  data,
  setData,
  columns,
}: Props<RecordType>) => {
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState<string>("");
  const isEditing = (record: RecordType) => editingKey === record.key;

  const edit = (record: Partial<RecordType> & { key: Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(String(record.key));
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as RecordType;

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
      render: (_: any, record: RecordType) => {
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
      onCell: (record: RecordType) => ({
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
