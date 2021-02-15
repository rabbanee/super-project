interface ModalBodyProps {
  children?: any,
  className?: string,
  props?: any,
}

const ModalBody = ({ children, className, ...props } : ModalBodyProps) => {
  return (
    <div className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:px-4 sm:pt-5 h-100 rounded-lg ${className ?? ''}`} {...props}>
      { children  }
    </div>
  );
};

export default ModalBody;