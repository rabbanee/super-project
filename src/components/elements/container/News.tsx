import ContainerProps from "@elements/container/Interface";

const NewsContainer = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={`grid w-full bg-white grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-6 ${className ?? ''}`} { ...props }>
      { children }
    </div>
  );
};

export default NewsContainer;