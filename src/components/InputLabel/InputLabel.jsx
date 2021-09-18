import React from "react";

const inputLabel = (props) => {
  const { labelFor, className, labelText } = props;
  const label = (
    <label htmlFor={labelFor} className={className}>
      {labelText}
    </label>
  );

  return label;
};

export default inputLabel;
