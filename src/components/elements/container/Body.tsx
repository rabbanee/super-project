import ContainerProps from "@elements/container/Interface";

const ContainerBody = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={`px-4 py-5 bg-white sm:p-6 rounded-t-xl ${className ?? ''}`} { ...props  }>
      { children  }
    </div>
  );
};

export default ContainerBody;