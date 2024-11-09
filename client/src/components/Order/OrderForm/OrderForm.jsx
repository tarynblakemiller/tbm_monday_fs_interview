import PropTypes from "prop-types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Divider, TextField } from "monday-ui-react-core";
import OrderButton from "../Button/OrderButton";
import { OrderHeader } from "../OrderHeader/OrderHeader";
import ErrorMessage from "../../Error/Error";
import { useOrderForm } from "../../../hooks/useOrderForm/useOrderForm.js";
import { useFragrances } from "../../../hooks/useOrderForm/useFragrances.js";

import FragranceSelector from "../../FragranceSelector/FragranceSelector.jsx";

import "./OrderForm.css";

const OrderForm = () => {
  const { id } = useParams();
  // Get fragrance data using the custom hook
  const fragrances = useFragrances();

  const {
    formData,
    setFormData,
    handleSubmit,
    loadOrder,
    deleteCurrentOrder,
    error,
    isLoading,
  } = useOrderForm({
    initialState: {
      firstName: "",
      lastName: "",
      quantity: 0,
      dropdown: {
        // Add this to initialState
        labels: [],
      },
    },
    validate: (data) => {
      const errors = {};
      if (!data.firstName) errors.firstName = "Required";
      if (!data.lastName) errors.lastName = "Required";
      if (!data.fragranceCategories?.length)
        errors.fragranceCategories = "Select at least one fragrance";
      return errors;
    },
  });

  useEffect(() => {
    if (id) {
      loadOrder(id);
    }
  }, [id, loadOrder]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(!!formData.id);
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCurrentOrder();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleFragranceSelect = (selection) => {
    console.log("Selection received:", selection);
    setFormData({
      ...formData, // Spread existing form data
      fragranceCategories: selection.map((s) => s.id),
      dropdown: {
        labels: selection.map((s) => s.category),
      },
    });
  };
  return (
    <div className="order-wrapper">
      <OrderHeader onFilterClick={() => console.log("Filter clicked")} />
      <Divider direction="horizontal" />

      <div className="order-maker-container">
        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleFormSubmit} className="input-field-container">
          <div className="input-grid-container">
            <div className="input-item">
              <TextField
                title="Client First Name"
                placeholder="Taryn"
                value={formData.firstName}
                onChange={(value) => setFormData({ firstName: value })}
                size={TextField.sizes.small}
                required
              />
            </div>
            <TextField
              title="Client Last Name"
              placeholder="Miller"
              value={formData.lastName}
              onChange={(value) => setFormData({ lastName: value })}
              size={TextField.sizes.small}
              required
            />
            <TextField
              title="Quantity"
              placeholder="0"
              value={formData.quantity}
              onChange={(value) => setFormData({ quantity: value })}
              type="number"
              min="1"
              max="3"
              size={TextField.sizes.small}
              required
            />
          </div>
          <div className="fragrance-selector-container">
            <FragranceSelector
              onChange={handleFragranceSelect}
              value={formData.fragranceCategories}
              options={fragrances}
            />
          </div>
          <div className="order-btn-container">
            <OrderButton
              onClick={handleFormSubmit}
              text={
                isLoading
                  ? "Submitting..."
                  : formData.id
                  ? "Update Order"
                  : "Start Order"
              }
              disabled={isLoading}
            />
            {formData.id && (
              <OrderButton
                type="button"
                onClick={handleDelete}
                text="Delete Order"
                variant="destructive"
                className="ml-4"
              />
            )}
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
