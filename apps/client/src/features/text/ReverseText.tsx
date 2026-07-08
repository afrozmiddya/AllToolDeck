import React, { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { TextToolLayout } from "../../components/common/TextToolLayout";
import { Button } from "@/components/ui/button";

export const ReverseText: React.FC = () => {
  const [reverseMode, setReverseMode] = useState<"text" | "words" | "lines">("text");

  const processText = (input: string) => {
    if (reverseMode === "text") {
      return input.split('').reverse().join('');
    } else if (reverseMode === "words") {
      return input.split(' ').reverse().join(' ');
    } else {
      return input.split('\n').reverse().join('\n');
    }
  };

  const extraControls = (
    <div className="flex gap-2 flex-wrap">
      <Button variant={reverseMode === "text" ? "default" : "outline"} onClick={() => setReverseMode("text")} size="sm">Reverse Entire Text</Button>
      <Button variant={reverseMode === "words" ? "default" : "outline"} onClick={() => setReverseMode("words")} size="sm">Reverse Word Order</Button>
      <Button variant={reverseMode === "lines" ? "default" : "outline"} onClick={() => setReverseMode("lines")} size="sm">Reverse Line Order</Button>
    </div>
  );

  return (
    <TextToolLayout
      title="Reverse Text"
      description="Reverse letters, words, or entire lines of text."
      icon={ArrowLeftRight}
      processText={processText}
      actionButtonText="Reverse"
      extraControls={extraControls}
    />
  );
};
