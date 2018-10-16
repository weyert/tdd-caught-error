import React, { Component } from "react";

import { FieldArray } from "formik";
import { TextInput } from "./TextInput";

const Checkbox = props => {
  const { children, ...otherProps } = props;
  return (
    <div>
      <label>
        <input type="checkbox" {...otherProps} />
        {props.children}
      </label>
    </div>
  );
};
// <label class="checkbox"><input id="foodTypes" name="foodTypes" type="checkbox" value="foodtype1">Food type 1</label>

export const CollectionSelector = class CollectionSelector extends Component {
  render() {
    const { collectionOptions = [] } = this.props;
    const allCollectionOptions = [
      ...collectionOptions,
      {
        id: "other",
        description: "Other"
      }
    ];

    return (
      <FieldArray {...this.props}>
        {props => (
          <div>
            {allCollectionOptions.length > 0 &&
              allCollectionOptions.map((collectionItem, index) => {
                const fieldValue = props.form.values[props.name] || [];
                return (
                  <TextInput
                    component={Checkbox}
                    key={index}
                    value={collectionItem.id}
                    checked={fieldValue.includes(collectionItem.id)}
                    name={props.name}
                    onChange={e => {
                      if (e.target.checked) {
                        props.push(collectionItem.id);
                      } else {
                        const idx = fieldValue.indexOf(collectionItem.id);
                        props.remove(idx);
                      }
                    }}
                  >
                    {collectionItem.description}
                  </TextInput>
                );
              })}
          </div>
        )}
      </FieldArray>
    );
  }
};
