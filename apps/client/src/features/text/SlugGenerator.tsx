import React from "react";
import { Link } from "lucide-react";
import { TextToolLayout } from "../../components/common/TextToolLayout";

export const SlugGenerator: React.FC = () => {
  const processText = (input: string) => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <TextToolLayout
      title="Slug Generator"
      description="Convert any text string into a clean, URL-friendly slug."
      icon={Link}
      processText={processText}
      actionButtonText="Generate Slug"
    />
  );
};
