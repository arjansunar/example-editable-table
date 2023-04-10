import React, { ReactNode } from "react";
import { Form, Select } from "antd";
import { getAllPayplanName } from "../api";
import { useQuery } from "react-query";

export const FormWithOptions: React.FC = () => {
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>

      {/* proposed way of creating asyncOptions */}
      <Form.Item label="Select async">
        <AsyncOption queryFn={getAllPayplanName}>
          {(payplanList) =>
            payplanList.map((el) => (
              <Select.Option key={el.id} value={el.id}>
                {el.name}
              </Select.Option>
            ))
          }
        </AsyncOption>
      </Form.Item>
    </Form>
  );
};

type AsyncOptionsProps = {
  children: (data: any[]) => ReactNode[];
  queryFn: () => Promise<any[]>;
};

const AsyncOption = ({ queryFn, children }: AsyncOptionsProps) => {
  const { data, isLoading } = useQuery({
    queryFn: queryFn,
  });
  if (isLoading || !data) return <Select>loading....</Select>;
  return <Select>{children(data)}</Select>;
};
