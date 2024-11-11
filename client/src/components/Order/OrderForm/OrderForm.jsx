import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Divider, TextField } from "monday-ui-react-core";
import OrderButton from "../Button/OrderButton";
import { OrderHeader } from "../OrderHeader/OrderHeader";

import "./OrderForm.css";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const OrderForm = () => {
  const [formData, setFormData] = useState({
    boardId: "7730832838",
    itemName: "",
    columnValues: {
      text: "",
      text6: "",
      numbers: 0,
      status: {
        label: "New Order",
      },
      date_1: {
        date: new Date().toISOString().split("T")[0],
      },
    },
  });

  const handleChange = (fieldName, value) => {
    console.log("Change received:", { fieldName, value });

    setFormData((prev) => {
      let updatedValues = { ...prev.columnValues };

      switch (fieldName) {
        case "firstName":
          updatedValues.text = value;
          break;
        case "lastName":
          updatedValues.text6 = value;
          break;
        case "quantity":
          updatedValues.numbers = parseInt(value) || 0;
          break;
      }

      return {
        ...prev,
        columnValues: updatedValues,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const columnValues = {
        text: formData.columnValues.text,
        text6: formData.columnValues.text6,
        numbers: formData.columnValues.numbers,
        status: { label: "New Order" },
        date_1: { date: new Date().toISOString().split("T")[0] },
      };

      const response = await apiClient.post("/orders/create", {
        boardId: formData.boardId,
        itemName: "New Order",
        columnValues: JSON.stringify(columnValues),
        groupId: "topics",
      });

      console.log("Initial item created:", response.data);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="order-wrapper">
      <OrderHeader onFilterClick={() => console.log("Filter clicked")} />
      <Divider direction="horizontal" />

      <div className="order-maker-container">
        {/* {error && <ErrorMessage message={error} />} */}

        <form onSubmit={handleSubmit} className="input-field-container">
          <div className="input-grid-container">
            <div className="input-item">
              <TextField
                name="firstName"
                title="Client First Name"
                placeholder="Taryn"
                value={formData.columnValues.text}
                onChange={(value) => handleChange("firstName", value)}
                size={TextField.sizes.small}
                required
              />
            </div>
            <TextField
              title="Client Last Name"
              placeholder="Miller"
              value={formData.columnValues.text6}
              onChange={(value) => handleChange("lastName", value)}
              size={TextField.sizes.small}
              required
            />
            <TextField
              name="quantity"
              title="Quantity"
              placeholder="0"
              value={formData.columnValues.number}
              onChange={(value) => handleChange("quantity", value)}
              type="number"
              min="1"
              max="3"
              size={TextField.sizes.small}
              required
            />
          </div>
          {/* <div className="fragrance-selector-container">
            <FragranceSelector
              onChange={handleFragranceSelect}
              value={formData.dropdown.labels}
              maxSelections={3}
            />
          </div> */}
          <div className="order-btn-container">
            <OrderButton
              onClick={handleSubmit}
              text={"Start Order"}
              // text={
              //   isLoading
              //     ? "Submitting..."
              //     : formData.id
              //     ? "Update Order"
              //     : "Start Order"
              // }
              // disabled={isLoading}
            />
            {/* {formData.id && (
              <OrderButton
                type="button"
                onClick={handleDelete}
                text="Delete Order"
                variant="destructive"
                className="ml-4"
              />
            )} */}
          </div>
        </form>
      </div>
    </div>
  );
};

OrderForm.propTypes = {
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
};

export default OrderForm;
