import React from "react";
import { Hash } from "lucide-react";
import SparkMD5 from "spark-md5";
import { TextToolLayout } from "../../components/common/TextToolLayout";

export const MD5Generator: React.FC = () => {
  const processText = (input: string) => {
    return SparkMD5.hash(input);
  };

  return (
    <TextToolLayout
      title="MD5 Generator"
      description="Generate an MD5 checksum hash for any string instantly."
      icon={Hash}
      processText={processText}
      actionButtonText="Generate MD5 Hash"
    />
  );
};
