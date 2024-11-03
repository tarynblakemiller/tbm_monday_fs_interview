import BaseInput from "../../Input/Input";
import OrderButton from "../../Button/Button";
import { useState } from "react";
import FragranceSelector from "../../Dropdown/Dropdown";
import PropTypes from "prop-types";
import { IconButton } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import { Divider } from "monday-ui-react-core";
import Filter from "monday-ui-react-core/dist/icons/Filter";

import "./OrderForm.css";

export const OrderForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    quantity: 0,
    scentProfiles: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        quantity: formData.quantity,
        scentProfiles: formData.scentProfiles,
      };

      const orderResponse = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderBody),
      });

      if (!orderResponse.ok) {
        throw new Error("Network orderResponse was not ok");
      }

      const orderData = await orderResponse.json();
      console.log(orderData);

      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="order-wrapper">
      <div className="order-maker-header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Heading type="h2">Order Maker</Heading>
          <IconButton
            icon={Filter}
            ariaLabel="Filter the widget by everything"
            size={IconButton.sizes.SMALL}
          />
        </div>
        <button className="meatball-button">⋯</button>
      </div>
      <Divider direction="horizontal" />
      <div className="order-maker-container">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-field-container">
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
              <div className="fragrance-selector-container">
                <FragranceSelector
                  onChange={(value) =>
                    setFormData({ ...formData, scentProfiles: value })
                  }
                />
              </div>

              <div className="button-container">
                <OrderButton
                  className="order-button"
                  type="submit"
                  text="Start Order"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

OrderForm.propTypes = {
  onSubmit: PropTypes.func,
};
