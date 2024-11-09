import { useState, useCallback } from "react";
import { orderService } from "../../services/api.js";
// import { MONDAY_SETTINGS } from "../../components/FragranceSelector/constants.js";

export const useOrderForm = ({ initialState = {}, validate }) => {
  const [formData, setFormData] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = useCallback(() => {
    if (!validate) return true;
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return false;
    }
    return true;
  }, [formData, validate]);

  // Remove the dropdown processing since we're getting it in the correct format
  const updateFormData = (updates) => {
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log("Updated form data:", newData); // Debug log
      return newData;
    });
  };

  const handleSubmit = useCallback(async () => {
    if (!handleValidation()) return;

    setIsLoading(true);
    try {
      console.log("Form data before payload:", formData);
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        quantity: Number(formData.quantity),
        dropdown: {
          labels: formData.dropdown, // Already in correct format from OrderForm
        },
      };
      console.log("Submitting payload:", payload);

      if (formData.id) {
        await orderService.update(formData.id, payload);
      } else {
        await orderService.create(payload);
        setFormData(initialState);
      }
    } catch (error) {
      console.error("Submit error:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
      }
      setFieldErrors((prev) => ({
        ...prev,
        submit: error.message || "Failed to submit order",
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData, initialState, handleValidation]);

  const deleteCurrentOrder = useCallback(async () => {
    if (formData.id) {
      try {
        await orderService.delete(formData.id);
        setFormData(initialState);
      } catch (error) {
        console.error("Delete error:", error);
        setFieldErrors((prev) => ({
          ...prev,
          delete: error.message || "Failed to delete order",
        }));
      }
    }
  }, [formData.id, initialState]);

  return {
    formData,
    setFormData: updateFormData,
    handleSubmit,
    deleteCurrentOrder,
    fieldErrors,
    isLoading,
  };
};
