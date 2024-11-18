// monday.types.ts
import mondaySdk from "monday-sdk-js";
import { OperationResult } from "urql";

export type MondayClient = ReturnType<typeof mondaySdk>;

export interface ColumnValue {
  id: string;
  text: string | null;
  value: string | null;
}

export interface MondayItem {
  id: string;
  name: string;
  column_values: ColumnValue[];
}

export interface CreateItemInput {
  boardId: string;
  columnValues: Record<string, any> | string;
  groupId?: string;
  itemName?: string;
}

export interface UpdateItemInput {
  boardId: string;
  itemId: string;
  columnId: string;
  value: string;
}

// Response types for specific operations
export type ItemResponse = OperationResult<
  {
    create_item?: { id: string };
    change_column_value?: { id: string };
    delete_item?: { id: string };
  },
  {
    boardId?: string;
    groupId?: string;
    itemName?: string;
    columnValues?: string;
    itemId?: string;
    columnId?: string;
    value?: string;
  }
>;

export type BoardResponse = OperationResult<
  {
    boards: Array<{
      items?: MondayItem[];
      columns?: Array<{
        id: string;
        title: string;
        type?: string;
        settings_str?: string;
      }>;
      groups?: Array<{
        id: string;
        title: string;
        items: Array<{ id: string; name: string }>;
      }>;
    }>;
  },
  {
    boardId: string;
    columnId?: string;
  }
>;
