import { useState } from "react";
import { fragranceApi } from "../../services/api";
import useFragrances from "../../hooks/useFragrances/useFragrances";
import { Button, Dropdown, TextField } from "monday-ui-react-core";

import "./FragranceManager.css";
import MultiSelect from "../MultiSelect/MultiSelect";

const FragranceManager = () => {
  const { data: fragrances, categories, refetch } = useFragrances(true);
  console.log(fragrances);
  const [showManager, setShowManager] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fragranceApi.update(editingId, formData);
      } else {
        await fragranceApi.create({
          ...formData,
          image_url: "https://example.com/placeholder.jpg",
        });
      }
      setFormData({
        id: formData.id,
        fragrance_id: formData.fragrance_id,
        name: "",
        category: formData.category,
        description: "",
      });
      setEditingId(null);
      refetch();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fragranceApi.delete(id);
      refetch();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (fragrance) => {
    setEditingId(fragrance.id);
    setFormData({
      id: fragrance.id,
      fragrance_id: fragrance.fragrance_id,
      name: fragrance.name,
      category: fragrance.category,
      description: fragrance.description,
    });
  };

  if (!showManager) {
    return (
      <Button
        onClick={() => setShowManager(true)}
        kind={Button.kinds.SECONDARY}
        size={Button.sizes.XS}
        marginLeft={true}
      >
        Manage Fragrances
      </Button>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField type="text" value={formData.id} placeholder={formData.id} />

        <TextField
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <Dropdown
          placeholder="Select Category"
          options={categories}
          value={formData.category}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
        />

        <TextField
          type="text"
          placeholder="Description"
          size={TextField.sizes.small}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <Button
          kind={Button.kinds.SECONDARY}
          size={Button.sizes.XS}
          type="submit"
        >
          {editingId ? "Update" : "Add"} Fragrance
        </Button>
      </form>
      <div className="fragrance-list">
        {fragrances?.map((fragrance) => (
          <div key={fragrance.id} className="fragrance-row">
            <div className="fragrance-details">
              <div className="fragrance-id">ID: {fragrance.id}</div>
              <div className="fragrance-main">
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
