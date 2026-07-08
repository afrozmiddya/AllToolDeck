import React, { useState } from "react";
import { Type } from "lucide-react";
import { TextToolLayout } from "../../components/common/TextToolLayout";
import { Button } from "@/components/ui/button";

export const CaseConverter: React.FC = () => {
  const [caseType, setCaseType] = useState<"upper" | "lower" | "title" | "sentence">("upper");

  const processText = (input: string) => {
    switch (caseType) {
      case "upper":
        return input.toUpperCase();
      case "lower":
        return input.toLowerCase();
      case "title":
        return input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      case "sentence":
        return input.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
      default:
        return input;
    }
  };

  const extraControls = (
    <div className="flex gap-2 flex-wrap">
      <Button variant={caseType === "upper" ? "default" : "outline"} onClick={() => setCaseType("upper")} size="sm">UPPERCASE</Button>
      <Button variant={caseType === "lower" ? "default" : "outline"} onClick={() => setCaseType("lower")} size="sm">lowercase</Button>
      <Button variant={caseType === "title" ? "default" : "outline"} onClick={() => setCaseType("title")} size="sm">Title Case</Button>
      <Button variant={caseType === "sentence" ? "default" : "outline"} onClick={() => setCaseType("sentence")} size="sm">Sentence case</Button>
    </div>
  );

  return (
    <TextToolLayout
      title="Case Converter"
      description="Easily convert text between different letter cases."
      icon={Type}
      processText={processText}
      actionButtonText={`Convert to ${caseType} case`}
      extraControls={extraControls}
    />
  );
};
