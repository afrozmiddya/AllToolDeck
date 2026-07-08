import React from "react";
import { PageContainer } from "../components/common/PageContainer";
import { FileText } from "lucide-react";

export const TermsOfService: React.FC = () => {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-text tracking-tight">Terms of Service</h1>
        </div>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-muted text-lg mb-6">Last updated: July 2026</p>
          
          <div className="glass-panel p-8 rounded-2xl space-y-6">
            <section>
              <h2 className="text-xl font-heading font-semibold text-text mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted leading-relaxed">
                By accessing and using AllToolDeck, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-heading font-semibold text-text mb-3">2. Use License</h2>
              <p className="text-muted leading-relaxed">
                Permission is granted to temporarily use the materials and tools on AllToolDeck for personal or commercial transient use. This is the grant of a license, not a transfer of title.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-heading font-semibold text-text mb-3">3. Disclaimer</h2>
              <p className="text-muted leading-relaxed">
                The materials on AllToolDeck are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-heading font-semibold text-text mb-3">4. Limitations</h2>
              <p className="text-muted leading-relaxed">
                In no event shall AllToolDeck or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
