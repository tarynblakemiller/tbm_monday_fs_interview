import PropTypes from "prop-types";
import Dropdown from "monday-ui-react-core/dist/Dropdown";
import TextWithHighlight from "monday-ui-react-core/dist/TextWithHighlight";
import { useState, useMemo, useCallback } from "react";
import { useFragrances } from "../../hooks/useOrderForm/useFragrances";
import "./FragranceSelector.css";

export const FragranceSelector = ({
  onChange,
  error: customError,
  maxSelections = 3,
  value = [],
}) => {
  const [error, setInternalError] = useState(false);
  const { fragrances, loading } = useFragrances();

  const FRAGRANCE_OPTIONS = useMemo(() => {
    if (!fragrances.length) return [];

    return fragrances.map((fragrance) => ({
      id: fragrance.id.toString(),
      value: fragrance.category,
      label: `${fragrance.name} - ${fragrance.category}`,
      chipColor: Dropdown.chipColors.PRIMARY,
      fragranceData: fragrance,
      category: fragrance.category,
    }));
  }, [fragrances]);

  const selectedOptions = useMemo(() => {
    if (!value?.length) return [];
    return value
      .map((val) => FRAGRANCE_OPTIONS.find((opt) => opt.id === val.toString()))
      .filter(Boolean);
  }, [value, FRAGRANCE_OPTIONS]);

  // In FragranceSelector.jsx
  const handleSelection = useCallback(
    (selected) => {
      if (!selected) {
        setInternalError(true);
        onChange({
          ids: [],
          labels: [], // Simplify this
        });
        return;
      }

      const validSelection = selected.slice(0, maxSelections);
      setInternalError(validSelection.length !== maxSelections);

      // Just send what we need
      const selectedData = {
        ids: validSelection.map((option) => option.id),
        labels: validSelection.map((option) => option.category), // Just get the categories
      };

      console.log("Selected in FragranceSelector:", selectedData);
      onChange(selectedData);
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
        loading={loading}
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
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
      }),
    ])
  ),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  maxSelections: PropTypes.number,
};

// FragranceSelector.propTypes = {
//   value: PropTypes.arrayOf(PropTypes.string),
//   onChange: PropTypes.func.isRequired,
//   error: PropTypes.bool,
//   maxSelections: PropTypes.number,
// };

export default FragranceSelector;
