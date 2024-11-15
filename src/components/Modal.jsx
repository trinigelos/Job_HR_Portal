// components/Modal.jsx
import React from 'react';
import "./Modal.css";

const Modal = ({ message, onClose, actions }) => {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <p>{message}</p>
          <div className="modal-actions">
            {actions ? (
              actions // Render custom actions if provided
            ) : (
              <button className='btn-close modal-btn' onClick={onClose}>OK</button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  