import BaseInput from "../../Input/Input";
import OrderButton from "../../Button/Button";
import { useState } from "react";
import FragranceSelector from "../../Dropdown/Dropdown";
import PropTypes from "prop-types";
import { Icon } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import "./OrderForm.css";

export const OrderForm = ({ onSubmit, boardId }) => {
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
    <div className="order-maker-container">
      <div>
        <div className="order-maker-header">
          <Heading type="h2">Order Maker</Heading>
          <button className="text-gray-400">⋮</button>
          <Icon clickable="true" icon={function noRefCheck() {}} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-grid-container">
            <div className="input-item">
              <BaseInput
                title="First Name"
                placeholder="Joseph"
                size="small"
                value={formData.firstName}
                onChange={(value) =>
                  setFormData({ ...formData, firstName: value })
                }
              />
            </div>
            <div className="input-item">
              <BaseInput
                title="Last Name"
                placeholder="Smith"
                size="small"
                value={formData.lastName}
                onChange={(value) =>
                  setFormData({ ...formData, lastName: value })
                }
              />
            </div>
            <div className="input-item">
              <BaseInput
                type="number"
                title="Quantity"
                placeholder="0"
                size="small"
                value={formData.quantity}
                onChange={(value) =>
                  setFormData({ ...formData, quantity: value })
                }
              />
            </div>
          </div>
          <FragranceSelector />
          <div className="fragrance-selector-container"></div>
          <div className="button-container">
            <OrderButton
              className="order-button"
              type="submit"
              text="Start Order"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

OrderForm.propTypes = {
  onSubmit: PropTypes.func,
};
