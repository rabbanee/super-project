import ContainerProps from "@elements/container/Interface";

const FooterContainer = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={`px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-xl ${className ?? ''}`} {...props}>
      { children  }
    </div>
  );
};

export default FooterContainer;