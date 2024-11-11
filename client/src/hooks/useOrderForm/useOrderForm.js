import { useState, useCallback } from "react";
import { orderService } from "../../services/api.js";
// import { MONDAY_SETTINGS } from "../../components/FragranceSelector/constants.js";

export const useOrderForm = ({ initialState = {}, validate }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    columnValues: {},
  });
  // const [fieldErrors, setFieldErrors] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  // const handleValidation = useCallback(() => {
  //   if (!validate) return true;
  //   const validationErrors = validate(formData);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setFieldErrors(validationErrors);
  //     return false;
  //   }
  //   return true;
  // }, [formData, validate]);

  // const updateFormData = (updates) => {
  //   const processedUpdates = { ...updates };
  // if ("fragranceCategories" in updates) {
  //   console.log("FRAGRANCE CATEGORIES 1", updates.fragranceCategories);
  //   processedUpdates.dropdown = updates.fragranceCategories.map(
  //     (fragrance) => ({
  //       id: fragrance.fragrance_id, // Match `fragrance_id` to dropdown `id`
  //       name: fragrance.category, // Use `category` as the dropdown `name`
  //     })
  //   );
  // }
  // if ("dropdown" in updates) {
  //   processedUpdates.dropdown = Array.isArray(updates.dropdown)
  //     ? updates.dropdown.map(String)
  //     : updates.dropdown
  //     ? [String(updates.dropdown)]
  //     : [];
  // }

  //   setFormData((prev) => ({ ...prev, ...processedUpdates }));
  //   setFieldErrors((prev) => {
  //     const newErrors = { ...prev };
  //     Object.keys(updates).forEach((key) => delete newErrors[key]);
  //     return newErrors;
  //   });
  // };
  // console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/create", formData);
      console.log("Item created:", response.data);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  // const handleSubmit = useCallback(async () => {
  //   if (!handleValidation()) return;

  //   setIsLoading(true);
  //   try {
  //     console.log("FORM DATA", formData);
  //     const payload = {
  //       firstName: formData.firstName,
  //       lastName: formData.lastName,
  //       quantity: parseInt(formData.quantity),
  //       // fragranceCategories: formData.fragranceCategories.map((fragrance) =>
  //       //   // If fragrance is an object with an id, use that, otherwise use the value directly
  //       //   typeof fragrance === "object" ? fragrance.id : fragrance
  //       // ),
  //     };

  //     console.log("Submitting payload:", payload);

  //     const response = await orderService.create(payload);
  //     setFormData(initialState);
  //     return response;
  //   } catch (error) {
  //     console.error("Submit error:", error);
  //     setFieldErrors((prev) => ({
  //       ...prev,
  //       submit: error.message || "Failed to submit order",
  //     }));
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [formData, initialState, handleValidation]);

  // const deleteCurrentOrder = useCallback(async () => {
  //   if (formData.id) {
  //     try {
  //       await orderService.delete(formData.id);
  //       setFormData(initialState);
  //     } catch (error) {
  //       console.error("Delete error:", error);
  //       setFieldErrors((prev) => ({
  //         ...prev,
  //         delete: error.message || "Failed to delete order",
  //       }));
  //     }
  //   }
  // }, [formData.id, initialState]);

  return {
    formData,
    setFormData: handleSubmit,
    // deleteCurrentOrder,
    // fieldErrors,
    // isLoading,
  };
};
