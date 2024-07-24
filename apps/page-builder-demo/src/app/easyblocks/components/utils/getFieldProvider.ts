import { EditingInfo } from "@swell/easyblocks-core";

export const getFieldProvider = (editingInfo: EditingInfo) => (path: string) =>
  editingInfo.fields.find((field) => field.path === path)!;
