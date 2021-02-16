const ModalFooter = ({ children }) => {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-4 sm:flex sm:flex-row-reverse rounded-lg">
      { children  }
    </div>
  );
};

export default ModalFooter;