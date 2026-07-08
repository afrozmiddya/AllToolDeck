import React from "react";
import { PageContainer } from "../components/common/PageContainer";
import { Shield } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-text tracking-tight">Privacy Policy</h1>
        </div>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-muted text-lg mb-6">Last updated: July 2026</p>
          
          <div className="glass-panel p-8 rounded-2xl space-y-6">
            <section>
              <h2 className="text-xl font-heading font-semibold text-text mb-3">1. Introduction</h2>
              <p className="text-muted leading-relaxed">
                At AllToolDeck, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our tools.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-heading font-semibold text-text mb-3">2. Data Collection</h2>
              <p className="text-muted leading-relaxed mb-2">
                <strong>Local Processing:</strong> Most of our tools (e.g., PDF merging, image resizing) process your files entirely locally within your browser. We do not upload, store, or have access to these files on our servers.
              </p>
              <p className="text-muted leading-relaxed">
                <strong>Analytics:</strong> We may collect anonymous usage data to improve our services and understand how users interact with our platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-heading font-semibold text-text mb-3">3. Cookies</h2>
              <p className="text-muted leading-relaxed">
                We use local storage and cookies strictly for functional purposes, such as saving your theme preferences (dark/light mode) and recent tool history.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-heading font-semibold text-text mb-3">4. Contact Us</h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us via our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
