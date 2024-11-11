export const useMondaySDK = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeQuery = async (query) => {
    try {
      setLoading(true);
      const response = await monday.api(query);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (boardId, itemName, columnValues) => {
    const query = `
      mutation {
        create_item (
          board_id: ${boardId},
          item_name: "${itemName}",
          column_values: ${JSON.stringify(JSON.stringify(columnValues))}
        ) {
          id
        }
      }
    `;
    return executeQuery(query);
  };

  const updateItem = async (itemId, columnValues) => {
    const query = `
      mutation {
        change_column_value (
          item_id: ${itemId},
          column_id: "status",
          value: ${JSON.stringify(JSON.stringify(columnValues))}
        ) {
          id
        }
      }
    `;
    return executeQuery(query);
  };

  return {
    loading,
    error,
    executeQuery,
    createItem,
    updateItem,
  };
};
