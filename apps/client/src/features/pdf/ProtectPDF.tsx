import React, { useState } from "react";
import { Lock, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const ProtectPDF: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Lock className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Protect PDF</CardTitle>
              <CardDescription>Add a password to your PDF document to restrict access.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
              <Construction className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">Coming Soon!</h3>
              <p className="text-zinc-500 mt-2 max-w-md mx-auto">
                PDF Encryption requires complex server-side cryptographic processing. We are currently rolling this feature out in our upcoming release.
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <Button disabled>Feature Unavailable</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
