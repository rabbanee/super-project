interface ModalFooterProps {
  children?: any,
  className?: string,
}

const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div className={`bg-gray-50 px-4 py-3 sm:px-4 sm:flex sm:flex-row-reverse rounded-lg ${className ?? ''}`}>
      { children  }
    </div>
  );
};

export default ModalFooter;