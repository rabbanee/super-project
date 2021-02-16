import ContainerProps from "@elements/container/Interface";

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={`shadow-md container mx-auto rounded-xl ${className ?? ''}`} { ...props  }>
      { children  }
    </div>
  );
};

export default Container;