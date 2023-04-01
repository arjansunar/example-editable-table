import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EditableTableProvider } from "./context/EditableTableContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EditableTableProvider>
      <App />
    </EditableTableProvider>
  </React.StrictMode>
);
