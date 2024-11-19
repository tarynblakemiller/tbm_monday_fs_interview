export interface MondayColumnValue {
  id: string;
  text: string;
  value: string;
  type?: string;
}

export interface MondayItem {
  id: string;
  name: string;
  column_values: MondayColumnValue[];
}

export interface ItemResponse {
  data: {
    create_item?: { id: string };
    change_column_value?: { id: string };
    delete_item?: { id: string };
  };
}

export interface BoardResponse {
  data: {
    boards: Array<{
      items?: MondayItem[];
      columns?: Array<{
        id: string;
        title: string;
        type: string;
      }>;
      groups?: Array<{
        id: string;
        title: string;
        items: Array<{
          id: string;
          name: string;
        }>;
      }>;
    }>;
  };
}

export interface CreateItemInput {
  boardId: string;
  itemName?: string;
  columnValues: Record<string, any> | string;
  groupId?: string;
}

export interface UpdateItemInput {
  boardId: string;
  itemId: string;
  columnId?: string;
  columnValues?: Record<string, any>;
}

export interface MondayClient {
  setToken: (token: string) => void;
  setApiVersion: (version: string) => void;
  api: (
    query: string,
    options?: { variables: Record<string, any> }
  ) => Promise<any>;
}
