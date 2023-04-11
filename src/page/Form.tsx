import React, { Key, ReactNode } from "react";
import { Button, Form, FormItemProps, Input, Select } from "antd";
import { getAllPayplanName } from "../api";
import { useQuery } from "react-query";
import { useForm } from "antd/es/form/Form";

/* proposed asyncoptions*/
type AsyncOptionsProps = {
  children: (data: any[]) => ReactNode[];
  queryFn: () => Promise<any[]>;
  formItemProps: FormItemProps;
};

const { Option } = Select;
/**
 * Wrapper around AndD's `Form.Item` with a `Select` component to render Select.Options
 * according to the response of an `Api request`
 *
 * WARN: It consists its own `Form.Item` component so do not wrap it with another `Form.Item`
 * component
 */
const AsyncOption = ({
  queryFn,
  formItemProps,
  children,
}: AsyncOptionsProps) => {
  const { data, isLoading } = useQuery({
    queryFn: queryFn,
  });

  //INFO: must have the Form.Item must be coupled with Select component
  return (
    <Form.Item {...formItemProps}>
      <Select loading={isLoading}>{data && children(data)}</Select>
    </Form.Item>
  );
};

/* custom type to include a element prop*/
interface CustomFormItemsProps extends FormItemProps {
  key: Key;
  name: FormItemProps["name"];
  render?: (itemProps: FormItemProps) => ReactNode;
  asyncComp?: true;
}

const formItems: CustomFormItemsProps[] = [
  {
    key: "test",
    label: "Default",
    name: "select",
    rules: [{ required: true, message: "this is required" }],
    render: () => (
      <Select>
        <Select.Option value="Demo">Demo</Select.Option>
      </Select>
    ),
  },
  {
    key: "AsyncOption",
    label: "AsyncOption",
    name: "asyncOption",
    asyncComp: true,
    render: (formItemProps) => (
      <AsyncOption queryFn={getAllPayplanName} formItemProps={formItemProps}>
        {(data) =>
          data.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))
        }
      </AsyncOption>
    ),
  },
];

export const FormWithOptions: React.FC = () => {
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [form] = useForm();

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={handleFormSubmit}
    >
      {/* call by mapping over a json object */}
      {formItems.map(({ render, asyncComp, ...formItemProps }) => {
        if (asyncComp && render)
          return <div key={formItemProps.key}> {render(formItemProps)}</div>;
        return (
          <Form.Item {...formItemProps}>
            {render ? render(formItemProps) : <Input />}
          </Form.Item>
        );
      })}
      {/* manual invokation */}
      <AsyncOption
        queryFn={getAllPayplanName}
        formItemProps={{ name: "ManualAsync", label: "Manual", required: true }}
      >
        {(payplanList) =>
          payplanList.map((payplan) => (
            <Option key={payplan.id} value={payplan.name}>
              {payplan.name}
            </Option>
          ))
        }
      </AsyncOption>

      {/* submit button */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
