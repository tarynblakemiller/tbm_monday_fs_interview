import BaseInput from "../../Input/Input";
import OrderButton from "../../Button/Button";
import { useState } from "react";
import FragranceSelector from "../../Dropdown/Dropdown";

export const OrderForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    quantity: 0,
    scentProfiles: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <BaseInput
        title={"First Name"}
        placeholder="John"
        size="small"
        value={formData.firstName}
        onChange={(value) => setFormData({ ...formData, firstName: value })}
      />
      <BaseInput
        title="Last Name"
        placeholder="Doe"
        size="small"
        value={formData.lastName}
        onChange={(value) => setFormData({ ...formData, lastName: value })}
      />
      <BaseInput
        type="number"
        title="Quantity"
        placeholder="0"
        size="small"
        value={formData.quantity}
        onChange={(value) => setFormData({ ...formData, quantity: value })}
      />
      <FragranceSelector />
      <OrderButton type="submit" text="Start Order" />
    </form>
  );
};
