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

  const updateFormData = (updates) => {
    const processedUpdates = { ...updates };
    if ("dropdown" in updates) {
      processedUpdates.dropdown = Array.isArray(updates.dropdown)
        ? updates.dropdown.map(String)
        : updates.dropdown
        ? [String(updates.dropdown)]
        : [];
    }

    setFormData((prev) => ({ ...prev, ...processedUpdates }));
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach((key) => delete newErrors[key]);
      return newErrors;
    });
  };

  const handleSubmit = useCallback(async () => {
    if (!handleValidation()) return;

    setIsLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        quantity: parseInt(formData.quantity),
        labels: formData.dropdown,
      };

      if (formData.id) {
        await orderService.update(formData.id, payload);
      } else {
        await orderService.create(payload);
        setFormData(initialState);
      }
    } catch (error) {
      console.error("Submit error:", error);
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
