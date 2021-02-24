import React, { ReactNode } from 'react';

interface TitleProps {
  children?: ReactNode,
  className?: string,
}

const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h1 className={`text-3xl sm:text-4xl font-bold	text-black ${className || ''}`}>{children}</h1>
  );
};

export default Title;