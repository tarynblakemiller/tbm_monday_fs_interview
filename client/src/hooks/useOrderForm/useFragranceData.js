import { useState, useEffect } from "react";
import { orderService } from "../../services/api.js";

const useFragranceData = () => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFragrances = async () => {
      try {
        setLoading(true);
        const response = await orderService.getFragrances();
        setFragrances(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching fragrances:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFragrances();
  }, []);

  return { fragrances, loading, error };
};

export default useFragranceData;
