import { Bank, DMSResponse, Employee, Inventory, Store } from "../type";
import { PayplanList } from "../type/payplan";

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
export const sleep = (time: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const getInventory = async () => {
  return await fetch("../data/inventory.json").then(async (res) => {
    // await sleep(1000);
    return res.json() as Promise<DMSResponse<Inventory>>;
  });
};

export const getAllPayplanName = async () => {
  return await fetch("/data/payplan.json").then(
    (res) => res.json() as Promise<PayplanList>
  );
};
