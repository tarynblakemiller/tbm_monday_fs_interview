import mondayApiClient from "../config/mondayApi.js";

export const createOrderInBoard = async (orderData) => {
  console.log("Received order data:", orderData);

  const columnValues = {
    status: { label: "New Order" },
    text: { text: orderData.firstName },
    text6: { text: orderData.lastName },
    numbers: { number: orderData.quantity },
    // Format specifically for Monday's dropdown column type
    dropdown: { ids: orderData.fragranceCategories }, // Changed from labels to ids
    date_1: { date: new Date().toISOString().split("T")[0] },
  };

  console.log("Formatted column values:", columnValues);

  const escapedColumnValues = JSON.stringify(columnValues).replace(/"/g, '\\"');

  const mutation = `
  mutation {
    create_item (
      board_id: 7730832838,
      item_name: "${orderData.firstName} ${orderData.lastName}'s Order",
      column_values: "${escapedColumnValues}"
    ) {
      id
    }
  }
`;

  try {
    console.log("GraphQL Mutation:", mutation);
    const response = await mondayApiClient.post("", { query: mutation });
    console.log("Monday.com API Response:", response.data);
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    return response.data;
  } catch (error) {
    console.error("Monday API Error:", error.response?.data || error);
    throw new Error("Failed to create order in Monday.com");
  }
};

export const getDropdownOptions = async () => {
  const query = `
    query {
      boards(ids: 7730832838) {
        columns(types: [dropdown]) {
          id
          title
          settings_str
        }
      }
    }
  `;

  try {
    const response = await mondayApiClient.post("", { query });
    return response.data;
  } catch (error) {
    console.error("Error fetching dropdown options:", error);
    throw error;
  }
};

export const getOrdersFromBoard = async () => {
  const query = `
    query {
      boards(ids: 7730832838) {
        items {
          id
          name
          column_values {
            id
            text
          }
        }
      }
    }
  `;

  const response = await mondayApiClient.post("", { query });
  return response.data;
};
