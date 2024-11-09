import { mondayApiClient, MONDAY_BOARD_ID } from "../config/mondayApi.js";

export const mondayService = {
  async createItem(orderData) {
    // Flatten the dropdown structure
    const columnValues = {
      text: orderData.firstName,
      text6: orderData.lastName,
      numbers: orderData.quantity,
      dropdown: {
        labels: orderData.dropdown.labels.labels, // Extract the nested array
      },
      status: {
        label: "New Order",
      },
      date_1: {
        date: new Date().toISOString().split("T")[0],
      },
    };

    const mutation = `
      mutation CreateItem($boardId: Int!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
        create_item (
          board_id: $boardId
          group_id: $groupId
          item_name: $itemName
          column_values: $columnValues
        ) {
          id
        }
      }
    `;

    const variables = {
      boardId: parseInt(MONDAY_BOARD_ID),
      groupId: "topics",
      itemName: `${orderData.firstName} ${orderData.lastName}`,
      columnValues: JSON.stringify(columnValues),
    };

    console.log(
      "Monday.com mutation variables:",
      JSON.stringify(variables, null, 2)
    );

    const response = await mondayApiClient.post("", {
      query: mutation,
      variables,
    });

    return response.data.data.create_item.id;
  },
};
