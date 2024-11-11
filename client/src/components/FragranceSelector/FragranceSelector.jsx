import PropTypes from "prop-types";
import Dropdown from "monday-ui-react-core/dist/Dropdown";
import TextWithHighlight from "monday-ui-react-core/dist/TextWithHighlight";
import { useState, useMemo, useCallback } from "react";
import useFragranceData from "../../hooks/useOrderForm/useFragranceData";
import "./FragranceSelector.css";

export const FragranceSelector = ({
  onChange,
  error: customError,
  maxSelections = 3,
  value = [],
}) => {
  const [error, setInternalError] = useState(false);
  const { fragrances, loading } = useFragranceData();

  const FRAGRANCE_OPTIONS = useMemo(() => {
    if (!fragrances.length) return [];

    return fragrances.map((fragrance) => ({
      id: fragrance.category,
      value: fragrance.category,
      label: `${fragrance.name} - ${fragrance.category}`,
      chipColor: Dropdown.chipColors.PRIMARY,
      category: fragrance.category,
    }));
  }, [fragrances]);

  const selectedOptions = useMemo(() => {
    if (!value?.length) return [];
    return FRAGRANCE_OPTIONS.filter((option) => value.includes(option.value));
  }, [value, FRAGRANCE_OPTIONS]);

  // In FragranceSelector.jsx
  const handleSelection = useCallback(
    (selected) => {
      if (!selected) {
        setInternalError(true);
        onChange([]);
        return;
      }

      const validSelection = selected.slice(0, maxSelections);
      setInternalError(validSelection.length !== maxSelections);

      // Just send what we need
      const selectedCategories = validSelection.map((option) => option.value);
      onChange(selectedCategories);
    },
    [maxSelections, onChange]
  );

  if (loading) {
    return <div>Loading fragrances...</div>;
  }

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
