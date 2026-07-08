import React, { useState } from "react";
import { Link } from "lucide-react";
import { TextToolLayout } from "../../components/common/TextToolLayout";
import { Button } from "@/components/ui/button";

export const URLEncoderDecoder: React.FC = () => {
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const processText = (input: string) => {
    try {
      if (mode === "encode") {
        return encodeURIComponent(input);
      } else {
        return decodeURIComponent(input);
      }
    } catch (e) {
      return "Error: Invalid URL component or malformed string.";
    }
  };

  const extraControls = (
    <div className="flex gap-2 flex-wrap">
      <Button variant={mode === "encode" ? "default" : "outline"} onClick={() => setMode("encode")} size="sm">Encode URL</Button>
      <Button variant={mode === "decode" ? "default" : "outline"} onClick={() => setMode("decode")} size="sm">Decode URL</Button>
    </div>
  );

  return (
    <TextToolLayout
      title="URL Encoder / Decoder"
      description="Safely encode or decode strings to be passed securely in URLs."
      icon={Link}
      processText={processText}
      actionButtonText={mode === "encode" ? "Encode String" : "Decode String"}
      extraControls={extraControls}
    />
  );
};
