import React from 'react'

const TextInput = ({ label, id, placeholder, type = 'text', hint, required, ...props }) => {
  return (
    <div className="field-group">
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="field-required">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="field-input"
        {...props}
      />
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  )
}

export default TextInput
