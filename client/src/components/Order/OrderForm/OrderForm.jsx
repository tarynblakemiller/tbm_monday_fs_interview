import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Divider, Flex, TextField } from "monday-ui-react-core";
import OrderButton from "../Button/OrderButton";
import { OrderHeader } from "../OrderHeader/OrderHeader";
import MultiSelect from "../../MultiSelect/MultiSelect";
import Error from "../../Error/Error";
import FragranceManager from "../../FragranceManager/FragranceManager.tsx";

import "./OrderForm.css";
import useFragrances from "../../../hooks/useFragrances/useFragrances";
import { generateOrderId } from "../../../../../server/src/utils/generators";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const OrderForm = () => {
  const initialState = {
    boardId: "7730832838",
    item_name: "New Order",
    columnValues: {
      text: "",
      text6: "",
      numbers: 0,
      dropdown: {
        labels: [],
      },
      status: {
        label: "New Order",
      },
      date_1: {
        date: new Date().toISOString().split("T")[0],
      },
    },
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(undefined);
  const { data, loading, error: fragranceError } = useFragrances(true);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => {
      let updatedValues = { ...prev.columnValues };
      console.log("UPDATED VALUES", updatedValues);
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
        case "fragrances": {
          updatedValues.dropdown = {
            labels: value, // Direct assignment since MultiSelect returns correct format
          };
          break;
        }
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
        dropdown: {
          labels: formData.columnValues.dropdown.labels.map(
            (label) => label.id
          ),
        },
        status: { label: "New Order" },
        date_1: { date: new Date().toISOString().split("T")[0] },
      };

      console.log(columnValues);

      const mondayResponse = await apiClient.post("/orders", {
        boardId: formData.boardId,
        itemName: generateOrderId(),
        columnValues,
        groupId: "topics",
      });
      console.log("Monday Response:", mondayResponse);

      const { data, status } = mondayResponse;
      if (status === 200) {
        console.log(data.data.create_item.id);
        setFormData(initialState);
        return data.data.create_item.id;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div>
      <div className="order-wrapper">
        <OrderHeader onFilterClick={() => console.log("Filter clicked")} />
        <Divider direction="horizontal" />
        <Flex>
          <FragranceManager />
        </Flex>

        <div className="order-maker-container">
          {error && <Error message={error} />}

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
            <div>
              <MultiSelect
                value={formData.columnValues.dropdown.labels}
                onChange={(selected) => handleChange("fragrances", selected)}
                maxSelections={3}
                label="Select Scents"
                options={data}
                loading={loading}
                error={fragranceError}
              />
            </div>
            <div className="order-btn-container">
              <OrderButton onClick={handleSubmit} text={"Start Order"} />
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="fragrance-options-container"></div>
      </div>
    </div>
  );
};

OrderForm.propTypes = {
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
};

export default OrderForm;
