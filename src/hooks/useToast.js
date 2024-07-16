import React, { createContext, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-wrapper">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-container ${toast.type}-toast`}>
            <div className="toast-icon">
              {toast.type === 'success' && <FontAwesomeIcon icon={faCheckCircle} />}
              {toast.type === 'error' && <FontAwesomeIcon icon={faTimesCircle} />}
              {toast.type === 'warning' && <FontAwesomeIcon icon={faExclamationCircle} />}
              {toast.type === 'info' && <FontAwesomeIcon icon={faInfoCircle} />}
            </div>
            <div>{toast.message}</div>
            <button className="toast-close-button" onClick={() => removeToast(toast.id)}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
