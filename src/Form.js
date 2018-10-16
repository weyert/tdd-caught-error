import React, { Component } from "react";

import { CollectionSelector } from "./CollectionSelector";
import { Formik } from "formik";
import { TextInput } from "./TextInput";

/**
 * Form
 */
export class Form extends Component {
  static defaultProps = {
    mode: "create",
    validateOnBlur: false
  };

  onFormSubmit = (values, formikActions) => {
    typeof this.props.onFormCompleted === "undefined" &&
      console.warn("onFormCompleted callback not given!");
    this.props.onFormCompleted && this.props.onFormCompleted();
  };

  onFormReset = () => {
    typeof this.props.onFormReset === "undefined" &&
      console.warn("onFormCleared callback not given!");
    this.props.onFormReset && this.props.onFormReset();
  };

  onFormValidation = values => {};

  render() {
    return (
      <div>
        <Formik
          initialValues={this.props.initialValues}
          validateOnBlur={this.props.validateOnBlur}
          validate={this.onFormValidation}
          onSubmit={this.onFormSubmit}
          onFormReset={this.onFormReset}
        >
          {props => (
            <form onSubmit={props.handleSubmit} onReset={props.handleReset}>
              <TextInput
                name="name"
                label="Title of collection"
                required
                placeholder="Enter title"
              />
              <TextInput
                component={CollectionSelector}
                name="formOptions"
                label="List of options"
                collectionOptions={this.props.collectionOptions}
              />

              <pre>{JSON.stringify(props.values, null, 2)}</pre>

              <div className="buttons">
                <button type="submit" onClick={props.handleSubmit}>
                  Post
                </button>
                <button type="button" onClick={props.handleReset}>
                  Clear
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}