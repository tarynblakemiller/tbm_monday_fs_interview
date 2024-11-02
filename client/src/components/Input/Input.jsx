// import mondaySdk from "monday-sdk-js";
// const monday = mondaySdk();
import { TextField } from "monday-ui-react-core";
import PropTypes from "prop-types";

const BaseInput = ({ title, placeholder }) => {
  return (
    <TextField
      placeholder={placeholder}
      title={title}
      size={TextField.sizes.SMALL}
      requiredAsterisk={true}
    />
  );
};

export default BaseInput;

BaseInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  requiredAsterisk: PropTypes.boolean,
};

// Base Input Component
// export const BaseInput = ({ type, value, onChange, label, error }) => {
//   return (
//     <div>
//       {label && <label>{label}</label>}
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//       {error && <span>{error}</span>}
//     </div>
//   );
// };
