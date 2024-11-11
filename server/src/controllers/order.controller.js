import {
  createItem,
  updateItemById,
  getBoardItems,
  getItemById,
  deleteItemById,
} from "../services/mondayService.js";

const formatOrderData = (data) => {
  const labelMapping = {
    Smokey: "1",
    Fruity: "2",
    Fresh: "3",
    Floral: "4",
    Herbaceous: "5",
    Citrus: "6",
    Woody: "8",
  };

  const { firstName, lastName, quantity, labels } = data;

  const mappedLabels = Array.isArray(labels)
    ? labels
        .filter((label) => labelMapping[label])
        .map((label) => ({ id: labelMapping[label] }))
    : [];

  return {
    status: { label: "New Order" },
    text: { text: firstName || "" },
    text6: { text: lastName || "" },
    numbers: { number: parseInt(quantity) || 0 },
    dropdown: {
      labels: mappedLabels,
    },
    date_1: { date: new Date().toISOString().split("T")[0] },
  };
};

export const createOrder = async (req, res) => {
  try {
    const { firstName, lastName, quantity, labels } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["firstName", "lastName"],
      });
    }

    const columnValues = formatOrderData({
      firstName,
      lastName,
      quantity,
      labels,
    });

    console.log("Request body:", req.body);
    console.log("Formatted column values:", columnValues);

    const response = await createItem({
      boardId: process.env.MONDAY_BOARD_ID,
      groupId: "topics",
      itemName: `${firstName} ${lastName}`,
      columnValues: JSON.stringify(columnValues),
    });

    res.json({
      success: true,
      data: response,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating Monday.com order:", error);
    res.status(500).json({
      error: "Failed to create item on Monday.com",
      details: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const boardId = process.env.MONDAY_BOARD_ID;
    if (!boardId) {
      throw new Error("MONDAY_BOARD_ID not configured");
    }

    const response = await getBoardItems(boardId);
    if (!response?.boards?.[0]?.items) {
      return res.status(404).json({ error: "No items found" });
    }

    const formattedItems = response.boards[0].items.map((item) => {
      const columnValues = item.column_values.reduce((acc, col) => {
        try {
          if (col.type === "dropdown" && col.value) {
            acc[col.id] = JSON.parse(col.value);
          } else {
            acc[col.id] = col.text || col.value;
          }
        } catch (e) {
          acc[col.id] = col.text || col.value;
        }
        return acc;
      }, {});

      return {
        id: item.id,
        name: item.name,
        firstName: columnValues.text || "",
        lastName: columnValues.text6 || "",
        quantity: parseInt(columnValues.numbers) || 0,
        labels: columnValues.dropdown?.labels || [],
        status: columnValues.status,
        date: columnValues.date_1,
      };
    });

    res.json(formattedItems);
  } catch (error) {
    console.error("Error fetching Monday.com orders:", error);
    res.status(500).json({
      error: "Failed to fetch orders from Monday.com",
      details: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const response = await getItemById(parseInt(id));
    if (!response?.items?.[0]) {
      return res.status(404).json({ error: "Order not found" });
    }

    const item = response.items[0];
    const columnValues = item.column_values.reduce((acc, col) => {
      try {
        if (col.id === "dropdown" && col.value) {
          acc[col.id] = JSON.parse(col.value);
        } else {
          acc[col.id] = col.text || col.value;
        }
      } catch (e) {
        acc[col.id] = col.text || col.value;
      }
      return acc;
    }, {});

    res.json({
      id: item.id,
      name: item.name,
      firstName: columnValues.text || "",
      lastName: columnValues.text6 || "",
      quantity: parseInt(columnValues.numbers) || 0,
      labels: columnValues.dropdown?.labels || [],
      status: columnValues.status,
      date: columnValues.date_1,
    });
  } catch (error) {
    console.error("Error fetching Monday.com order:", error);
    res.status(500).json({
      error: "Failed to fetch order from Monday.com",
      details: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, quantity, labels } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const columnValues = formatOrderData({
      firstName,
      lastName,
      quantity,
      labels,
    });

    const response = await updateItemById(
      parseInt(id),
      JSON.stringify(columnValues)
    );

    res.json({
      success: true,
      data: response,
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error("Error updating Monday.com order:", error);
    res.status(500).json({
      error: "Failed to update order on Monday.com",
      details: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const response = await deleteItemById(parseInt(id));

    res.json({
      success: true,
      message: "Order deleted successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error deleting Monday.com order:", error);
    res.status(500).json({
      error: "Failed to delete order from Monday.com",
      details: error.message,
    });
  }
};
