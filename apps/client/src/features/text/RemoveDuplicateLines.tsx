import React from "react";
import { ListMinus } from "lucide-react";
import { TextToolLayout } from "../../components/common/TextToolLayout";

export const RemoveDuplicateLines: React.FC = () => {
  const processText = (input: string) => {
    const lines = input.split('\n');
    const uniqueLines = [...new Set(lines)];
    return uniqueLines.join('\n');
  };

  return (
    <TextToolLayout
      title="Remove Duplicate Lines"
      description="Find and remove all duplicate lines from your text document."
      icon={ListMinus}
      processText={processText}
      actionButtonText="Remove Duplicates"
    />
  );
};
