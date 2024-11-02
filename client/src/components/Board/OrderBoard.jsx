const OrderBoard = ({ boardId }) => {
  const [orders, setOrders] = useState([]);
  const { loading, error, createItem, updateItem } = useMondaySDK();

  useEffect(() => {
    // Initialize and listen to Monday.com events
    monday.listen("context", (res) => {
      // Handle context changes
    });
  }, []);

  const handleCreateOrder = async (formData) => {
    const columnValues = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      quantity: formData.quantity,
      status: "requests",
      scentProfiles: formData.scentProfiles,
    };

    try {
      await createItem(
        boardId,
        `${formData.firstName} ${formData.lastName}`,
        columnValues
      );
      // Refresh orders
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      await updateItem(itemId, { status: newStatus });
      // Refresh orders
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <OrderForm onSubmit={handleCreateOrder} />
      <OrderList orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default OrderBoard;
