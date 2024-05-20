import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Search by Name: <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
