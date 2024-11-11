import { mondayClient } from "../../index.js";
import { env } from "../config/environment.js";

export const formatColumnValues = (data) => {
  const { firstName, lastName, quantity, labels } = data;

  return {
    status: { label: "New Order" },
    text: { text: firstName || "" },
    text6: { text: lastName || "" },
    numbers: { number: parseInt(quantity) || 0 },
    // dropdown: {
    //   settings_str: JSON.stringify({
    //     limit_select: false,
    //     hide_footers: false,
    //     labels: Array.isArray(labels)
    //       ? labels.map((id) => ({ id: id.toString() }))
    //       : [],
    //   }),
    // },
    date_1: { date: new Date().toISOString().split("T")[0] },
  };
};

export const createItem = async ({
  boardId,
  groupId,
  itemName,
  columnValues,
}) => {
  try {
    const query = `
      mutation createItem($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
        create_item(
          board_id: $boardId,
          group_id: $groupId,
          item_name: $itemName,
          column_values: $columnValues
        ) {
          id
        }
      }
    `;

    const formattedColumnValues = formatColumnValues(columnValues);

    const variables = {
      boardId,
      groupId,
      itemName,
      columnValues: formattedColumnValues,
    };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (error) {
    console.error("Monday API Error:", error);
    throw new Error("Failed to create item on Monday.com");
  }
};

export const getBoardItems = async (boardId) => {
  try {
    const query = `
      query getBoardItems($boardId: [Int!]) {
        boards(ids: $boardId) {
          items {
            id
            name
            column_values {
              id
              text
              value
              title
              type
              additional_info
            }
          }
        }
      }
    `;
    const variables = { boardId: parseInt(boardId) };
    const response = await mondayClient.api(query, { variables });

    if (response.data?.boards?.[0]?.items) {
      return {
        boards: [
          {
            items: response.data.boards[0].items.map((item) => ({
              ...item,
              column_values: item.column_values.map((col) => {
                if (col.type === "dropdown" && col.value) {
                  try {
                    const parsedValue = JSON.parse(col.value);
                    return {
                      ...col,
                      parsed_value: parsedValue,
                      settings_str: parsedValue.settings_str || col.value,
                    };
                  } catch (e) {
                    return col;
                  }
                }
                return col;
              }),
            })),
          },
        ],
      };
    }
    return response;
  } catch (error) {
    console.error("Monday API Error:", error);
    throw new Error("Failed to fetch items from Monday.com board");
  }
};
export const getItemById = async (itemId) => {
  try {
    const query = `
      query getItemById($itemId: [Int!]) {
        items(ids: $itemId) {
          id
          name
          column_values {
            id
            text
            value
          }
        }
      }
    `;
    const variables = { itemId };
    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (error) {
    console.error("Monday API Error:", error);
    throw new Error("Failed to fetch item by ID on Monday.com");
  }
};

export const updateItemById = async (itemId, columnValues) => {
  try {
    const query = `
      mutation updateItem($itemId: Int!, $boardId: Int!, $columnValues: JSON!) {
        change_multiple_column_values(
          board_id: $boardId,
          item_id: $itemId,
          column_values: $columnValues
        ) {
          id
        }
      }
    `;
    const variables = {
      itemId,
      boardId: parseInt(env.MONDAY_BOARD_ID),
      columnValues,
    };
    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (error) {
    console.error("Monday API Error:", error);
    throw new Error("Failed to update item on Monday.com");
  }
};

export const deleteItemById = async (itemId) => {
  try {
    const query = `
      mutation deleteItem($itemId: Int!) {
        delete_item(item_id: $itemId) {
          id
        }
      }
    `;
    const variables = { itemId };
    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (error) {
    console.error("Monday API Error:", error);
    throw new Error("Failed to delete item on Monday.com");
  }
};
