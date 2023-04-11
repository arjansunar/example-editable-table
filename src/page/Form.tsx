import React, { Key, ReactNode } from "react";
import { Button, Form, FormItemProps, Input, Select } from "antd";
import { getAllPayplanName } from "../api";
import { useQuery } from "react-query";
import { useForm } from "antd/es/form/Form";

/* proposed asyncoptions*/
type AsyncOptionsProps = {
  children?: (data: any[]) => ReactNode[];
  queryFn: () => Promise<any[]>;
};

const { Option } = Select;
const AsyncOption = ({ queryFn, children }: AsyncOptionsProps) => {
  const { data, isLoading } = useQuery({
    queryFn: queryFn,
  });
  if (isLoading || !data) return <Select loading />;

  if (!children)
    return (
      <Form.Item
        label="AsyncOption"
        name="AsyncOption"
        rules={[{ required: true, message: "Please select a username!" }]}
      >
        <Select loading={isLoading}>
          {data &&
            data.map((item) => (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
    );

  //INFO: must have the Form.Item must be coupled with Select component
  return (
    <Form.Item
      label="AsyncOption"
      name="AsyncOption"
      rules={[{ required: true, message: "Please select a username!" }]}
    >
      <Select loading={isLoading}>{data && children(data)}</Select>
    </Form.Item>
  );
};

/* custom type to include a element prop*/
interface CustomFormItemsProps extends FormItemProps {
  key: Key;
  name: FormItemProps["name"];
  element?: ReactNode;
  asyncComp?: true;
}

const formItems: CustomFormItemsProps[] = [
  {
    key: "test",
    label: "Default",
    name: "select",
    rules: [{ required: true, message: "this is required" }],
    element: (
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
    element: (
      <AsyncOption queryFn={getAllPayplanName}>
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
      name="basic"
      initialValues={{ remember: true }}
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={handleFormSubmit}
    >
      {formItems.map(({ element, asyncComp, ...itemProps }) => {
        if (asyncComp) return element;
        return (
          <Form.Item {...itemProps}>{element ? element : <Input />}</Form.Item>
        );
      })}
      {/* manual form call */}
      {/* <AsyncOption queryFn={getAllPayplanName}> */}
      {/*   {(data) => */}
      {/*     data.map((item) => ( */}
      {/*       <Option key={item.id} value={item.id}> */}
      {/*         {item.name} */}
      {/*       </Option> */}
      {/*     )) */}
      {/*   } */}
      {/* </AsyncOption> */}
      {/* submit button */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
