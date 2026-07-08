import React from "react";
import { Unlock } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { TextToolLayout } from "../../components/common/TextToolLayout";

export const JWTDecoder: React.FC = () => {
  const processText = (input: string) => {
    try {
      const decodedHeader = jwtDecode(input, { header: true });
      const decodedPayload = jwtDecode(input);
      
      return JSON.stringify({
        header: decodedHeader,
        payload: decodedPayload
      }, null, 2);
    } catch (error) {
      return "Invalid JWT token. Please ensure you pasted a valid JSON Web Token.";
    }
  };

  return (
    <TextToolLayout
      title="JWT Decoder"
      description="Decode JSON Web Tokens instantly to view their header and payload claims."
      icon={Unlock}
      processText={processText}
      actionButtonText="Decode Token"
      placeholder="Paste your JWT here (e.g. eyJhbGciOiJIUzI1...)"
    />
  );
};
