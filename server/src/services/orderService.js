import mondayApiClient from "../config/mondayApi.js";

export const createOrderInBoard = async (orderData) => {
  const mutation = `
  mutation {
    create_item(board_id: 7730832838, item_name: "${
      orderData.orderName
    }", column_values: "${JSON.stringify({
    fragrance: orderData.fragrance,
    quantity: orderData.quantity,
  })}") {
      id
    }
  }
`;
  const response = await mondayApiClient.post("", { query: mutation });
  return response.data;
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
