import PropTypes from "prop-types";
import { useState, useMemo, useCallback } from "react";
import Dropdown from "monday-ui-react-core/dist/Dropdown";
import TextWithHighlight from "monday-ui-react-core/dist/TextWithHighlight";
import useOptionsData from "../../hooks/useOrderForm/useOptionsData";
import "./MultiSelect.css";

export const MultiSelect = ({
  onChange,
  error: customError,
  maxSelections = 3,
  value = [],
  label = "Select Options",
}) => {
  const [errors, setErrors] = useState({
    invalid: false,
    duplicate: false,
  });

  const { data: DROPDOWN_OPTIONS, loading } = useOptionsData();
  console.log("DROPDOWN_OPTIONS:", DROPDOWN_OPTIONS);

  const selectedOptions = useMemo(
    () =>
      !value?.length
        ? []
        : DROPDOWN_OPTIONS.filter((option) =>
            value.some((selected) => selected.id === option.id)
          ),
    [value, DROPDOWN_OPTIONS]
  );

  const handleSelection = useCallback(
    (selected) => {
      if (!selected) {
        setErrors({ invalid: true, duplicate: false });
        onChange([]);
        return;
      }

      const categories = selected.map((option) => option.category);
      const hasDuplicates = categories.length !== new Set(categories).size;

      if (hasDuplicates) {
        setErrors((prev) => ({ ...prev, duplicate: true }));
        return;
      }

      const validSelection = selected.slice(0, maxSelections);
      setErrors({
        duplicate: false,
        invalid: validSelection.length !== maxSelections,
      });

      // Map to Monday.com format
      const mondayFormat = validSelection.map((option) => ({
        id: option.value, // This should match Monday's dropdown ID format
        name: option.label, // Optional but good to include
      }));

      onChange(mondayFormat);
    },
    [maxSelections, onChange]
  );

  if (loading) {
    return <div className="multi-select-loading">Loading options...</div>;
  }

  const showError = customError || errors.invalid || errors.duplicate;

  return (
    <div className="multi-select-container">
      <Dropdown
        value={selectedOptions}
        onChange={handleSelection}
        options={DROPDOWN_OPTIONS}
        multi
        multiline
        size={Dropdown.sizes.MEDIUM}
        className="multi-select-dropdown"
        placeholder={`${label} (up to ${maxSelections})`}
        error={showError}
      />
      {showError && (
        <TextWithHighlight
          className="multi-select-error"
          text={`Please select exactly ${maxSelections} options`}
          type="danger"
        />
      )}
    </div>
  );
};

MultiSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  maxSelections: PropTypes.number,
  label: PropTypes.string,
  optionsEndpoint: PropTypes.string,
};

export default MultiSelect;