import { mondayClient } from "./monday/client";
import { queries } from "./monday/queries";
import { generateOrderId } from "../utils/generators";
import {
  CreateItemInput,
  UpdateItemInput,
  ItemResponse,
  BoardResponse,
} from "../types/monday.types";

export const mondayService = {
  createItem: async (data: CreateItemInput): Promise<ItemResponse> => {
    const uniqueID = generateOrderId();
    const { boardId, columnValues, groupId = "topics" } = data;

    return await mondayClient
      .mutation(queries.CREATE_ITEM, {
        boardId,
        groupId,
        itemName: uniqueID,
        columnValues:
          typeof columnValues === "string"
            ? columnValues
            : JSON.stringify(columnValues),
      })
      .toPromise();
  },

  updateItemName: async (data: UpdateItemInput): Promise<ItemResponse> => {
    const { boardId, itemId, columnId = "name" } = data;

    return await mondayClient
      .mutation(queries.UPDATE_ITEM_NAME, {
        boardId,
        itemId,
        columnId,
        value: JSON.stringify(`Order ${itemId}`),
      })
      .toPromise();
  },

  deleteItem: async (itemId: string): Promise<ItemResponse> =>
    await mondayClient.mutation(queries.DELETE_ITEM, { itemId }).toPromise(),

  getBoardItems: async (boardId: string): Promise<BoardResponse> =>
    await mondayClient.query(queries.GET_BOARD_ITEMS, { boardId }).toPromise(),

  getBoardStructure: async (boardId: string): Promise<BoardResponse> =>
    await mondayClient
      .query(queries.GET_BOARD_STRUCTURE, { boardId })
      .toPromise(),

  getBoardGroups: async (boardId: string): Promise<BoardResponse> =>
    await mondayClient.query(queries.GET_BOARD_GROUPS, { boardId }).toPromise(),

  getColumnValues: async (
    boardId: string,
    columnId: string
  ): Promise<BoardResponse> =>
    await mondayClient
      .query(queries.GET_COLUMN_VALUES, {
        boardId,
        columnId,
      })
      .toPromise(),
};

export type MondayService = typeof mondayService;
