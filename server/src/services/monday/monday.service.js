import { createClient, fetchExchange } from "urql";
import { MONDAY_QUERIES } from "./queries.js";

const createError = (message, originalError = null) => ({
  name: "MondayServiceError",
  message,
  originalError,
});

const createGraphQLClient = (apiToken) => {
  if (!apiToken) {
    throw createError("API token is required");
  }

  return createClient({
    url: "https://api.monday.com/v2",
    exchanges: [fetchExchange],
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    },
  });
};

const handleResponse = (response) =>
  response.error
    ? Promise.reject(createError(response.error.message, response.error))
    : response.data;

const executeOperation = (client) => async (query, variables) => {
  try {
    const response = await client.query(query, variables).toPromise();
    return handleResponse(response);
  } catch (error) {
    console.error("Monday.com API Error:", error);
    throw createError(
      error.message || "Failed to execute Monday.com operation",
      error
    );
  }
};

const createMondayService = ({ apiToken, boardId }) => {
  if (!boardId) {
    throw createError("Board ID is required");
  }

  const client = createGraphQLClient(apiToken);
  const execute = executeOperation(client);

  const validateConnection = () =>
    execute(MONDAY_QUERIES.GET_ME, {})
      .then((res) => !!res?.me?.name)
      .catch(() => false);

  return {
    createItem: ({ itemName, columnValues, groupId = "topics" }) => {
      if (!itemName) throw createError("Item name is required");

      return execute(MONDAY_QUERIES.CREATE_ITEM, {
        boardId,
        groupId,
        itemName,
        columnValues:
          typeof columnValues === "string"
            ? columnValues
            : JSON.stringify(columnValues),
      });
    },

    getItems: () => execute(MONDAY_QUERIES.GET_BOARD_ITEMS, { boardId }),

    updateItemName: (itemId, newName) => {
      if (!itemId) throw createError("Item ID is required");

      return execute(MONDAY_QUERIES.UPDATE_ITEM_NAME, {
        boardId,
        itemId,
        columnId: "name",
        value: JSON.stringify(`Order ${itemId}`),
      });
    },

    deleteItem: (itemId) => {
      if (!itemId) throw createError("Item ID is required");
      return execute(MONDAY_QUERIES.DELETE_ITEM, { itemId });
    },

    validateConnection,

    checkHealth: async () => {
      const [isConnected, boardResponse] = await Promise.all([
        validateConnection(),
        execute(MONDAY_QUERIES.GET_BOARD, { boardId }),
      ]);

      return {
        connected: isConnected && !!boardResponse?.boards?.[0],
        status: isConnected ? "healthy" : "degraded",
        boardId,
        details: {
          api: isConnected ? "connected" : "failed",
          board: boardResponse?.boards?.[0] ? "accessible" : "inaccessible",
        },
      };
    },
  };
};

export const initializeMondayClient = (config) => {
  try {
    return createMondayService(config);
  } catch (error) {
    console.error("Failed to initialize Monday client:", error);
    throw error;
  }
};
