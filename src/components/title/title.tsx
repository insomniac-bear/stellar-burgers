import { FC, ReactChild } from "react";

interface ITitleProps {
  tag: string;
  className?: string;
  children: ReactChild;
}

const Title: FC<ITitleProps> = ({ tag, className, children }) => {
  switch (tag) {
    case "h1":
      return (
        <h1 className={`text text_type_main-large ${className}`}>{children}</h1>
      );
    case "h2":
      return (
        <h2 className={`text text_type_main-medium ${className}`}>
          {children}
        </h2>
      );
    case "h3":
      return <h3 className={`${className}`}>{children}</h3>;
    default:
      return <h4 className={`${className}`}>{children}</h4>;
  }
};

export default Title;
