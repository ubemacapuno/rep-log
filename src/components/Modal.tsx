interface ModalProps {
  onClose: () => void;
  resetForm?: () => void;
  children?: React.ReactNode; // descructure children from ModalProps
}

// Unlike the daisyUI example, this component does not use <dialog>
// TODO: Fix so that users can't "tab" through elements beneath the modal
const Modal: React.FC<ModalProps> = ({ onClose, resetForm, children }) => {
  const handleClose = () => {
    if (resetForm) resetForm();
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={handleClose}
      />

      <div className="modal modal-open">
        <div className="modal-box max-w-md">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
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
