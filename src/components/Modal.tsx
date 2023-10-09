import React from "react";

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode; // descructure children from ModalProps
}

// Unlike the daisyUI example, this component does not use <dialog>
// TODO: Fix so that users can't "tab" through elements beneath the modal
const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      <div className="modal modal-open">
        <div className="modal-box max-w-md">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
