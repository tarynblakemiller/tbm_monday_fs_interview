const OrderList = ({ orders, onStatusChange }) => {
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <span>{order.item}</span>
          <span>{order.salesAssociate}</span>
          <BaseSelect
            value={order.status}
            onChange={(value) => onStatusChange(order.id, value)}
            options={[
              { value: "requests", label: "Requests" },
              { value: "working", label: "Working on it" },
              { value: "done", label: "Done" },
            ]}
          />
          <div>
            {order.scentProfiles.map((scent) => (
              <Tag key={scent} label={scent} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
