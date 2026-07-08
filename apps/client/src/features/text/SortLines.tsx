import React, { useState } from "react";
import { ArrowDownAZ } from "lucide-react";
import { TextToolLayout } from "../../components/common/TextToolLayout";
import { Button } from "@/components/ui/button";

export const SortLines: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const processText = (input: string) => {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    lines.sort((a, b) => a.localeCompare(b));
    if (sortOrder === "desc") lines.reverse();
    return lines.join('\n');
  };

  const extraControls = (
    <div className="flex gap-2">
      <Button variant={sortOrder === "asc" ? "default" : "outline"} onClick={() => setSortOrder("asc")} size="sm">Sort A-Z</Button>
      <Button variant={sortOrder === "desc" ? "default" : "outline"} onClick={() => setSortOrder("desc")} size="sm">Sort Z-A</Button>
    </div>
  );

  return (
    <TextToolLayout
      title="Sort Lines"
      description="Sort the lines of your text alphabetically."
      icon={ArrowDownAZ}
      processText={processText}
      actionButtonText="Sort Lines"
      extraControls={extraControls}
    />
  );
};
