import { useState, useEffect } from "react";
import { fragranceApi } from "../../services/api";

const useOptionsData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fragranceApi.getAll();
        // Extract unique categories
        const uniqueCategories = [
          ...new Set(response.data.map((item) => item.category)),
        ];

        // Transform to dropdown format
        const categoryOptions = uniqueCategories.map((category) => ({
          id: category,
          value: category,
          label: category,
          category: category,
        }));

        setData(categoryOptions);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useOptionsData;
