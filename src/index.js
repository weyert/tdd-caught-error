import { Form } from "./Form";
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div className="App">
      <Form
        onFormCompleted={() => alert("Form completed!")}
        onFormReset={() => alert("Form reset!")}
        collectionOptions={[
          { id: "option1", description: "Option 1" },
          { id: "option2", description: "Option 2" },
          { id: "option3", description: "Option 3" }
        ]}
        initialValues={{
          name: "Order",
          formOptions: []
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
