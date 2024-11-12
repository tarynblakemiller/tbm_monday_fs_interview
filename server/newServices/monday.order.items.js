import { gql } from "graphql-tag";
import { createClient, fetchExchange } from "urql";

const client = createClient({
  url: "https://api.monday.com/v2",
  exchanges: [fetchExchange],
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.MONDAY_API_TOKEN}`,
    },
  },
});

const CREATE_ITEM = gql`
  mutation CreateItem(
    $boardId: ID!
    $itemName: String!
    $columnValues: JSON!
    $groupId: String!
  ) {
    create_item(
      board_id: $boardId
      group_id: $groupId
      item_name: $itemName
      column_values: $columnValues
    ) {
      id
    }
  }
`;

async function createItem(data) {
  const { boardId, itemName, columnValues } = data;

  const groupId = data.groupId || "topics";

  const formattedColumnValues =
    typeof columnValues === "string"
      ? columnValues
      : JSON.stringify(columnValues);
  const result = await client
    .mutation(CREATE_ITEM, {
      boardId,
      groupId,
      itemName,
      columnValues: formattedColumnValues,
    })
    .toPromise();
  return result;
}

const UPDATE_ITEM_NAME = gql`
  mutation ChangeItemName(
    $boardId: ID!
    $itemId: ID!
    $columnId: String!
    $value: JSON!
  ) {
    change_column_value(
      board_id: $boardId
      item_id: $itemId
      column_id: $columnId
      value: $value
    ) {
      id
    }
  }
`;

async function updateItemName(data) {
  const { boardId, itemId } = data;
  const value = JSON.stringify(`Order ${itemId}`);
  const columnId = data.columnId || "name";

  const result = await client
    .mutation(UPDATE_ITEM_NAME, {
      boardId,
      itemId,
      columnId,
      value,
    })
    .toPromise();
  return result;
}

const GET_BOARD_ITEMS = gql`
  query GetBoardItems($boardId: ID!) {
    boards(ids: [$boardId]) {
      items {
        id
        name
        column_values {
          id
          text
          value
        }
      }
    }
  }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: ID!) {
    delete_item(item_id: $itemId) {
      id
    }
  }
`;

export const mondayService = {
  createItem,
  updateItemName,
  getItems: async (boardId) => {
    return await client.query(GET_BOARD_ITEMS, { boardId }).toPromise();
  },
  deleteItem: async (itemId) => {
    return await client.mutation(DELETE_ITEM, { itemId }).toPromise();
  },
};
