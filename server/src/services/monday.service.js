import { gql } from "graphql-tag";
import { format } from "sequelize/lib/utils";
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
  mutation ChangeColumnValue(
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
      name
    }
  }
`;

async function updateColumnValue(data) {
  const { boardId, itemId, columnId, value } = data;
  const result = await client
    .mutation(UPDATE_ITEM_NAME, {
      boardId,
      itemId,
      columnId,
      value: JSON.stringify(value),
    })
    .toPromise();
  return result;
}

export { createItem, updateColumnValue };
