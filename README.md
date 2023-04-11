## Steps to run the application

```bash
  pnpm i ## or npm i
  pnpm dev ## or npm run dev
```

## How to use the Editable table

```tsx
type Item {
  // type your data but must have key:string
}
const TableWrapper = () => {
  const columns = [] // columns for the table
  const [data,setData] =useState() // the data source
return (
  <>
    <EditableTable<Item>
      data={data}
      columns={columns}
      setData={setData}
    />
    // if item has no key

    <EditableTable<KeyAdded<Item>>
      data={addKey(data)}
      columns={columns}
      setData={setData}
    />
  </>
);
};
```

## How to use AsyncOptions

```tsx
{
  /* manual invokation */
}
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
</AsyncOption>;

// creating object and mapping over it
const objectTemplate = [
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

{
  /* call by mapping over a json object */
}
{
  formItems.map(({ render, asyncComp, ...formItemProps }) => {
    if (asyncComp && render)
      return <div key={formItemProps.key}> {render(formItemProps)}</div>;
    return (
      <Form.Item {...formItemProps}>
        {render ? render(formItemProps) : <Input />}
      </Form.Item>
    );
  });
}
```

> Checkout the definition at [EditableTable](./src/EditableTable.tsx)
