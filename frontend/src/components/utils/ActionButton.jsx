import React from "react";

const ActionButton = ({ label, onClick, type = "button", styleClass }) => {
    return (
        <button type={type} className={styleClass} onClick={onClick}>
            {label}
        </button>
    );
};

export default ActionButton;
