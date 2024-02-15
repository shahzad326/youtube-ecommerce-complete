import React from "react";

const CusotomInput = (props) => {
  const { type, label, i_id, i_class, name, value, onChange, onBlur } = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        placeholder={label}
        id={i_id}
        className={`form-control ${i_class}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CusotomInput;
