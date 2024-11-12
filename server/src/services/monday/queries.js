import { gql } from "graphql-tag";

export const MONDAY_QUERIES = {
  GET_ME: gql`
    query {
      me {
        name
      }
    }
  `,

  GET_BOARD: gql`
    query ($boardId: ID!) {
      boards(ids: [$boardId]) {
        id
      }
    }
  `,

  CREATE_ITEM: gql`
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
  `,

  UPDATE_ITEM_NAME: gql`
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
  `,

  GET_BOARD_ITEMS: gql`
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
  `,

  DELETE_ITEM: gql`
    mutation DeleteItem($itemId: ID!) {
      delete_item(item_id: $itemId) {
        id
      }
    }
  `,
};
