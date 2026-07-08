import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};
