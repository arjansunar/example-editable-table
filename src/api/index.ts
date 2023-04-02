import { Bank, DMSResponse, Employee, Inventory, Store } from "../type";

export const getStore = async () => {
  return await fetch("../data/store.json").then(
    (res) => res.json() as Promise<DMSResponse<Store>>
  );
};
export const getEmployee = async () => {
  return await fetch("../data/employee.json").then(
    (res) => res.json() as Promise<DMSResponse<Employee>>
  );
};
export const getBank = async () => {
  return await fetch("../data/bank.json").then(
    (res) => res.json() as Promise<DMSResponse<Bank>>
  );
};

export const getInventory = async () => {
  return await fetch("../data/inventory.json").then(
    (res) => res.json() as Promise<DMSResponse<Inventory>>
  );
};
