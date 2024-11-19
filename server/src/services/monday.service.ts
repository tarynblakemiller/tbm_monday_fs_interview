import { Client } from "urql";
import mondayClient from "./monday/client";
import { queries } from "./monday/queries";
import { generateOrderId } from "../utils/generators";
import {
  CreateItemInput,
  UpdateItemInput,
  ItemResponse,
  BoardResponse,
} from "../types/monday.types";

interface MutationOptions {
  variables: Record<string, any>;
}

export const mondayService = {
  createItem: async (data: CreateItemInput): Promise<ItemResponse> => {
    const uniqueID = generateOrderId();
    const { boardId, columnValues, groupId = "topics" } = data;

    const variables: MutationOptions["variables"] = {
      boardId,
      groupId,
      itemName: uniqueID,
      columnValues:
        typeof columnValues === "string"
          ? columnValues
          : JSON.stringify(columnValues),
    };

    const response = await (mondayClient as Client)
      .mutation(queries.CREATE_ITEM.loc?.source.body || "", variables)
      .toPromise();

    return response as ItemResponse;
  },

  updateItemName: async (data: UpdateItemInput): Promise<ItemResponse> => {
    const { boardId, itemId, columnId = "name" } = data;

    const variables: MutationOptions["variables"] = {
      boardId,
      itemId,
      columnId,
      value: JSON.stringify(`Order ${itemId}`),
    };

    const response = await (mondayClient as Client)
      .mutation(queries.UPDATE_ITEM_NAME.loc?.source.body || "", variables)
      .toPromise();

    return response as ItemResponse;
  },

  deleteItem: async (itemId: string): Promise<ItemResponse> => {
    const response = await (mondayClient as Client)
      .mutation(queries.DELETE_ITEM.loc?.source.body || "", { itemId })
      .toPromise();

    return response as ItemResponse;
  },

  getBoardItems: async (boardId: string): Promise<BoardResponse> => {
    const response = await (mondayClient as Client)
      .query(queries.GET_BOARD_ITEMS.loc?.source.body || "", { boardId })
      .toPromise();

    return response as BoardResponse;
  },

  getBoardStructure: async (boardId: string): Promise<BoardResponse> => {
    const response = await (mondayClient as Client)
      .query(queries.GET_BOARD_STRUCTURE.loc?.source.body || "", { boardId })
      .toPromise();

    return response as BoardResponse;
  },

  getBoardGroups: async (boardId: string): Promise<BoardResponse> => {
    const response = await (mondayClient as Client)
      .query(queries.GET_BOARD_GROUPS.loc?.source.body || "", { boardId })
      .toPromise();

    return response as BoardResponse;
  },

  getColumnValues: async (
    boardId: string,
    columnId: string
  ): Promise<BoardResponse> => {
    const response = await (mondayClient as Client)
      .query(queries.GET_COLUMN_VALUES.loc?.source.body || "", {
        boardId,
        columnId,
      })
      .toPromise();

    return response as BoardResponse;
  },
};

export type MondayService = typeof mondayService;
