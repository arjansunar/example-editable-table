export interface DMSResponse<dType = any> {
  http_status: number;
  message: any;
  data: dType[];
  success: boolean;
  code: any;
}

export * from "./bank";
export * from "./employee";
export * from "./inventory";
export * from "./store";
