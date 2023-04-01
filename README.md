## How to use the Editable table

```tsx
type Item {
    // type your data but must have key:string
}
const TableWrapper = () => {
    const columns = [] // columns for the table
    const originData =[] // the data source
  return (
    <>
      <EditableTable<Item> originData={originData} columns={columns} />
    </>
  );
};
```

> Checkout the definition at [EditableTable](./src/EditableTable.tsx)
