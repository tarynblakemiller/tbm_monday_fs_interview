import { Dropdown } from "monday-ui-react-core";
import { useMemo, useState } from "react";

const FragranceSelector = () => {
  const [selectedScents, setSelectedScents] = useState([]);

  const options = useMemo(
    () => [
      {
        value: "Herbaceous",
        label: "Herbaceous",
      },
      {
        value: "Fruity",
        label: "Fruity",
      },
      {
        value: "Fresh",
        label: "Fresh",
      },
      {
        value: "Floral",
        label: "Floral",
      },
    ],
    []
  );

  const handleChange = (selected) => {
    // If trying to select more than 3 items, take only the first 3
    if (selected && selected.length > 3) {
      setSelectedScents(selected.slice(0, 3));
    } else {
      setSelectedScents(selected);
    }
  };

  return (
    <div style={{ width: "400px" }}>
      <Dropdown
        value={selectedScents}
        onChange={handleChange}
        options={options}
        multi
        multiline
        className="dropdown-stories-styles_with-chips"
        placeholder="Select up to 3 scents"
      />
    </div>
  );
};

export default FragranceSelector;
