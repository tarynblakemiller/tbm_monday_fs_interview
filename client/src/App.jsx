if (typeof global === "undefined") {
  window.global = window;
}
import { Fragment } from "react";
import "vibe-storybook-components/index.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { OrderForm } from "./components/Order/OrderForm/OrderForm";
import { useEffect, useState } from "react";
import { AttentionBox } from "monday-ui-react-core";

const monday = mondaySdk();

function App() {
  const [context, setContext] = useState();

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  // const attentionBoxText = `Hello, your user_id is: ${
  //   context ? context.user.id : "still loading"
  // }.`;

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
