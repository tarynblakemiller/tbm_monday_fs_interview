import PropTypes from "prop-types";

const ErrorMessage = ({ message }) =>
  message ? (
    <div
      className="error-message"
      style={{ color: "red", marginBottom: "10px" }}
    >
      {message}
    </div>
  ) : null;

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
