// hooks/useFragrances.js
import { useState, useEffect } from "react";
import { fragranceApi } from "../../services/api";

export const useFragrances = () => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFragrances = async () => {
      try {
        setLoading(true);
        const response = await fragranceApi.getAll();
        setFragrances(response.data); // note: axios wraps the response in .data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFragrances();
  }, []);

  return { fragrances, loading, error };
};
