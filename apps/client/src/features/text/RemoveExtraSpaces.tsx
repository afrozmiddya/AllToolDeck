import React from "react";
import { AlignLeft } from "lucide-react";
import { TextToolLayout } from "../../components/common/TextToolLayout";

export const RemoveExtraSpaces: React.FC = () => {
  const processText = (input: string) => {
    // Replace multiple spaces with a single space, and trim ends of lines
    return input.split('\n').map(line => line.replace(/\s+/g, ' ').trim()).join('\n');
  };

  return (
    <TextToolLayout
      title="Remove Extra Spaces"
      description="Clean up text by removing consecutive blank spaces and trimming lines."
      icon={AlignLeft}
      processText={processText}
      actionButtonText="Remove Spaces"
    />
  );
};
