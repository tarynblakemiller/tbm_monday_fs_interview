import { useState, FormEvent, useMemo } from "react";
import { fragranceApi } from "../../services/api.js";
import useFragrances from "../../hooks/useFragrances/useFragrances";
import { Button, Dropdown, TextField } from "monday-ui-react-core";
import {
  Fragrance,
  FormData,
  UseFragrancesReturn,
  FragranceManagerProps,
  Category,
} from "./types";

import "./FragranceManager.css";

const INITIAL_FORM_STATE: FormData = {
  id: null,
  fragrance_id: "",
  name: "",
  category: "",
  description: "",
};

const FragranceManager: React.FC<FragranceManagerProps> = ({ onClose }) => {
  const {
    data: fragrances,
    categories,
    refetch,
  } = useFragrances(true) as UseFragrancesReturn;

  const [showManager, setShowManager] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.value === formData.category) || null,
    [categories, formData.category]
  );

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setEditingId(null);
  };

  const handleDropdownChange = (value: Category | null) => {
    if (!value) {
      setFormData((prev) => ({ ...prev, category: "" }));
      return;
    }
    setFormData((prev) => ({ ...prev, category: value.value }));
  };

  const handleTextChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "id" ? (value ? Number(value) : null) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const payload: Partial<Fragrance> = {
        ...(formData.id && { id: formData.id }),
        fragrance_id: formData.fragrance_id,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image_url: "https://example.com/placeholder.jpg",
      };
      console.log("PAYLOAD", payload);

      if (editingId) {
        await fragranceApi.update(editingId, payload);
      } else {
        await fragranceApi.create(payload);
      }
      resetForm();
      await refetch();
    } catch (error) {
      console.error("Error handling fragrance:", error);
    }
  };

  const handleEdit = (fragrance: Fragrance): void => {
    setEditingId(fragrance.id);
    setFormData({
      id: fragrance.id,
      fragrance_id: fragrance.fragrance_id,
      name: fragrance.name,
      category: fragrance.category,
      description: fragrance.description,
    });
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await fragranceApi.delete(id);
      await refetch();
    } catch (error) {
      console.error("Error deleting fragrance:", error);
    }
  };

  if (!showManager) {
    return (
      <Button
        onClick={() => setShowManager(true)}
        kind={Button.kinds.SECONDARY}
        size={Button.sizes.XS}
      >
        Manage Fragrances
      </Button>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="fragrance-form">
        <TextField
          name="id"
          placeholder="ID"
          value={formData.id?.toString() || ""}
          onChange={handleTextChange("id")}
          size={TextField.sizes.MEDIUM}
          // type="number"
        />

        <TextField
          name="fragrance_id"
          placeholder="Fragrance ID"
          value={formData.fragrance_id}
          onChange={handleTextChange("fragrance_id")}
          size={TextField.sizes.MEDIUM}
        />

        <Dropdown
          placeholder="Select Category"
          options={categories}
          value={
            categories.find((cat) => cat.value === formData.category) || null
          }
          onChange={handleDropdownChange}
          required
        />

        <TextField
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleTextChange("description")}
          size={TextField.sizes.MEDIUM}
          required
        />
        <Button kind={Button.kinds.SECONDARY} size={Button.sizes.XS}>
          {editingId ? "Update" : "Add"} Fragrance
        </Button>
      </form>
      <div className="fragrance-list">
        {fragrances?.map((fragrance: Fragrance) => (
          <div key={fragrance.id} className="fragrance-row">
            <div className="fragrance-details">
              <div className="fragrance-id">ID: {fragrance.id}</div>
              <div className={"fragrance-main"}>
                <strong>Name: {fragrance.name}</strong>
                <span>Category: {fragrance.category}</span>
              </div>
              <div className="fragrance-desc">
                Description: {fragrance.description}
              </div>
            </div>
            <div className="fragrance-actions">
              <Button
                kind={Button.kinds.SECONDARY}
                size={Button.sizes.XS}
                onClick={() => handleEdit(fragrance)}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(fragrance.id)}
                kind={Button.kinds.SECONDARY}
                size={Button.sizes.XS}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="fragrance-manager-container">
        <Button
          kind={Button.kinds.SECONDARY}
          size={Button.sizes.XS}
          onClick={() => setShowManager(false)}
          className="text-gray-500"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default FragranceManager;
