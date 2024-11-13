// useFragrances.js
import { useState, useEffect } from "react";
import { fragranceApi } from "../../services/api";

const useFragrances = (transformForDropdown = false) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFragrances = async () => {
    try {
      setLoading(true);
      const response = await fragranceApi.getAll();
      const fragrances = response.data || [];

      setData(fragrances);

      if (transformForDropdown) {
        const transformed = Array.from(
          new Set(fragrances.map((f) => f.category))
        ).map((category) => ({
          id: category,
          value: category,
          label: category,
          category: category,
        }));
        setCategories(transformed);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFragrances();
  }, [transformForDropdown]);

  return {
    data,
    categories,
    loading,
    error,
    refetch: fetchFragrances,
  };
};

export default useFragrances;
