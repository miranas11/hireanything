import React from "react";

const FormField = ({ label, value, onChange, type = "text", options = [] }) => {
    return (
        <div className="form-field">
            <label>{label}:</label>
            {options.length > 0 ? (
                <select value={value} onChange={onChange}>
                    <option value="">Select an option</option>
                    {options.map((option) => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            ) : (
                <input type={type} value={value} onChange={onChange} />
            )}
        </div>
    );
};

export default FormField;
