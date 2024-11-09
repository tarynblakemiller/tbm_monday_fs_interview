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

  // Get fragrances directly from your hook
  const fragrances = useFragranceData();

  // Transform the fragrance data into the format expected by Monday UI Dropdown
  const FRAGRANCE_OPTIONS = useMemo(() => {
    if (!fragrances.length) return [];

    return fragrances.map((fragrance) => ({
      id: fragrance.id.toString(),
      value: fragrance.id.toString(), // Using id as value
      label: fragrance.name, // Assuming there's a name field
      chipColor: Dropdown.chipColors.PRIMARY,
    }));
  }, [fragrances]);

  const selectedOptions = useMemo(() => {
    return value
      .map((val) => FRAGRANCE_OPTIONS.find((opt) => opt.id === String(val)))
      .filter(Boolean);
  }, [value, FRAGRANCE_OPTIONS]);

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
