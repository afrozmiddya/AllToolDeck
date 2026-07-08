import React from "react";
import { Hash } from "lucide-react";
import { TextToolLayout } from "../../components/common/TextToolLayout";

export const SHA256Generator: React.FC = () => {
  const processText = async (input: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };

  return (
    <TextToolLayout
      title="SHA-256 Generator"
      description="Generate a secure SHA-256 cryptographic hash for any string."
      icon={Hash}
      processText={processText}
      actionButtonText="Generate SHA-256 Hash"
    />
  );
};
