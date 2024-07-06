export default function ProductSpecificationModal({
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
         X
        </button>
        {children}
      </div>
    </div>
  );
}
