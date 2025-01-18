export type Option<Data> =
  | {
      type: "success";
      data: Data;
      error: null;
    }
  | { type: "error"; data: null; error: string };
