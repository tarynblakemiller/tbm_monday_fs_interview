import PropTypes from "prop-types";
import Dropdown from "monday-ui-react-core/dist/Dropdown";
import TextWithHighlight from "monday-ui-react-core/dist/TextWithHighlight";
import { useState, useMemo, useCallback } from "react";
import { MONDAY_SETTINGS } from "./constants";
import "./FragranceSelector.css";

let FRAGRANCE_OPTIONS = [
  { value: "smokey", label: "Smokey" },
  { value: "fruity", label: "Fruity" },
  { value: "fresh", label: "Fresh" },
  { value: "floral", label: "Floral" },
  { value: "herbaceous", label: "Herbaceous" },
  { value: "citrus", label: "Citrus" },
];

FRAGRANCE_OPTIONS = MONDAY_SETTINGS.labels.map((option) => ({
  ...option,
  id: option.id.toString(),
  value: option.id.toString(),
  label: option.name,
  chipColor: Dropdown.chipColors.PRIMARY,
  position: `(${option.name})`,
}));

export const FragranceSelector = ({
  onChange,
  error: customError,
  maxSelections = 3,
  value = [],
}) => {
  // const [fragrances, setFragrances] = useState([]);
  const [error, setInternalError] = useState(false);

  const selectedOptions = useMemo(() => {
    return value
      .map((val) => FRAGRANCE_OPTIONS.find((opt) => opt.id === String(val)))
      .filter(Boolean);
  }, [value]);

  // useEffect(() => {
  //   const fetchFragrances = async () => {
  //     try {
  //       const response = await fetch("/fragrances-endpoint"); // Adjust this URL
  //       const options = await response.json();
  //       setFragrances(options);
  //     } catch (err) {
  //       console.error("Error fetching fragrances:", err);
  //     }
  //   };
  //   fetchFragrances();
  // }, []);

  const handleSelection = useCallback(
    (selected) => {
      if (!selected) {
        setInternalError(true);
        onChange([]);
        return;
      }

      const validSelection = selected.slice(0, maxSelections);
      setInternalError(validSelection.length !== maxSelections);

      const selectedIds = validSelection.map((option) => option.id);
      onChange(selectedIds);
    },
    [maxSelections, onChange]
  );

  const showError = customError || error;

  return (
    <div className="fragrance-selector">
      <Dropdown
        value={selectedOptions}
        onChange={handleSelection}
        options={FRAGRANCE_OPTIONS}
        multi
        multiline
        className="dropdown-stories-styles_with-chips"
        placeholder="Select up to 3 scents"
      />
      {showError && (
        <TextWithHighlight
          className="error-text"
          text={`Please select exactly ${maxSelections} fragrances`}
        />
      )}
    </div>
  );
};

FragranceSelector.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  maxSelections: PropTypes.number,
};

export default FragranceSelector;
