import { useState, useEffect } from "react";
import { orderService } from "../../services/api.js";

const useFragranceData = () => {
  const [fragrances, setFragrances] = useState([]);

  useEffect(() => {
    orderService
      .getFragrances()
      .then((response) => setFragrances(response.data))
      .catch((error) => console.error("Error fetching fragrances:", error));
  }, []);

  return fragrances;
};

export default useFragranceData;
