if (typeof global === "undefined") {
  window.global = window;
}
import { Fragment } from "react";
import "vibe-storybook-components/index.css";
// import mondaySdk from "monday-sdk-js";
// import "./App.css";
import { OrderForm } from "./components/Order/OrderForm/OrderForm";

function App() {
  return (
    <Fragment>
      <OrderForm />
    </Fragment>
  );
}

export default App;

// placeholder={placeholder}
// title={title}
// size={TextField.sizes.MEDIUM}
// requiredAsterisk={true}
