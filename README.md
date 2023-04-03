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

> Checkout the definition at [EditableTable](./src/EditableTable.tsx)
