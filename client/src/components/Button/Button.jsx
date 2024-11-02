import { Button } from "monday-ui-react-core";
import PropTypes from "prop-types";

const OrderButton = ({ text, ...props }) => {
  return <Button {...props}>{text}</Button>;
};

OrderButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default OrderButton;
