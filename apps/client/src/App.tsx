import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/common/Layout";
import { ToolLayout } from "./components/common/ToolLayout";

// Initialize TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Lazy Load Core Pages
const HomePage = React.lazy(() => import("./features/home/HomePage"));
const CategoryPage = React.lazy(() => import("./features/categories/CategoryPage"));
const BlogPage = React.lazy(() => import("./features/blog/BlogPage"));
const BlogPostPage = React.lazy(() => import("./features/blog/BlogPostPage"));
const HtmlSitemap = React.lazy(() => import("./features/sitemap/HtmlSitemap"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService").then(m => ({ default: m.TermsOfService })));

// Programmatic Tool Lazy Loader Dictionary (To ensure maximum scalability)
const toolLoaders: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  // PDF Tools
  "/pdf/merge": React.lazy(() => import("./features/pdf/PdfMerger").then(m => ({ default: m.PdfMerger }))),
  "/pdf/split": React.lazy(() => import("./features/pdf/SplitPDF").then(m => ({ default: m.SplitPDF }))),
  "/pdf/compress": React.lazy(() => import("./features/pdf/CompressPDF").then(m => ({ default: m.CompressPDF }))),
  "/pdf/rotate": React.lazy(() => import("./features/pdf/RotatePDF").then(m => ({ default: m.RotatePDF }))),
  "/pdf/to-jpg": React.lazy(() => import("./features/pdf/PDFToJPG").then(m => ({ default: m.PDFToJPG }))),
  "/pdf/from-jpg": React.lazy(() => import("./features/pdf/JPGToPDF").then(m => ({ default: m.JPGToPDF }))),
  "/pdf/protect": React.lazy(() => import("./features/pdf/ProtectPDF").then(m => ({ default: m.ProtectPDF }))),
  "/pdf/unlock": React.lazy(() => import("./features/pdf/UnlockPDF").then(m => ({ default: m.UnlockPDF }))),
  "/pdf/to-word": React.lazy(() => import("./features/pdf/PDFToWord").then(m => ({ default: m.PDFToWord }))),
  "/pdf/from-word": React.lazy(() => import("./features/pdf/WordToPDF").then(m => ({ default: m.WordToPDF }))),

  // Image Tools
  "/image/convert": React.lazy(() => import("./features/image/ImageConverter").then(m => ({ default: m.ImageConverter }))),
  "/image/resize": React.lazy(() => import("./features/image/ResizeImage").then(m => ({ default: m.ResizeImage }))),
  "/image/compress": React.lazy(() => import("./features/image/CompressImage").then(m => ({ default: m.CompressImage }))),
  "/image/crop": React.lazy(() => import("./features/image/CropImage").then(m => ({ default: m.CropImage }))),
  "/image/rotate": React.lazy(() => import("./features/image/RotateImage").then(m => ({ default: m.RotateImage }))),
  "/image/background-remover": React.lazy(() => import("./features/image/BackgroundRemover").then(m => ({ default: m.BackgroundRemover }))),
  "/image/to-pdf": React.lazy(() => import("./features/image/ImageToPDF").then(m => ({ default: m.ImageToPDF }))),

  // Text Tools
  "/text/word-counter": React.lazy(() => import("./features/text/WordCounter").then(m => ({ default: m.WordCounter }))),
  "/text/json-formatter": React.lazy(() => import("./features/text/JsonFormatter").then(m => ({ default: m.JsonFormatter }))),
  "/text/case-converter": React.lazy(() => import("./features/text/CaseConverter").then(m => ({ default: m.CaseConverter }))),
  "/text/remove-spaces": React.lazy(() => import("./features/text/RemoveExtraSpaces").then(m => ({ default: m.RemoveExtraSpaces }))),
  "/text/remove-duplicates": React.lazy(() => import("./features/text/RemoveDuplicateLines").then(m => ({ default: m.RemoveDuplicateLines }))),
  "/text/reverse": React.lazy(() => import("./features/text/ReverseText").then(m => ({ default: m.ReverseText }))),
  "/text/sort": React.lazy(() => import("./features/text/SortLines").then(m => ({ default: m.SortLines }))),
  "/text/slug-generator": React.lazy(() => import("./features/text/SlugGenerator").then(m => ({ default: m.SlugGenerator }))),
  "/text/lorem-ipsum": React.lazy(() => import("./features/text/LoremIpsumGenerator").then(m => ({ default: m.LoremIpsumGenerator }))),
  "/text/difference": React.lazy(() => import("./features/text/TextDifferenceChecker").then(m => ({ default: m.TextDifferenceChecker }))),

  // Security Tools
  "/security/password-generator": React.lazy(() => import("./features/security/PasswordGenerator").then(m => ({ default: m.PasswordGenerator }))),
  "/security/password-strength": React.lazy(() => import("./features/security/PasswordStrengthChecker").then(m => ({ default: m.PasswordStrengthChecker }))),
  "/security/base64": React.lazy(() => import("./features/security/Base64Converter").then(m => ({ default: m.Base64Converter }))),
  "/security/sha256": React.lazy(() => import("./features/security/SHA256Generator").then(m => ({ default: m.SHA256Generator }))),
  "/security/md5": React.lazy(() => import("./features/security/MD5Generator").then(m => ({ default: m.MD5Generator }))),
  "/security/url": React.lazy(() => import("./features/security/URLEncoderDecoder").then(m => ({ default: m.URLEncoderDecoder }))),
  "/security/jwt": React.lazy(() => import("./features/security/JWTDecoder").then(m => ({ default: m.JWTDecoder }))),
  "/security/qr-generator": React.lazy(() => import("./features/security/QRCodeGenerator").then(m => ({ default: m.QRCodeGenerator }))),
  "/security/qr-scanner": React.lazy(() => import("./features/security/QRCodeScanner").then(m => ({ default: m.QRCodeScanner })))
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/sitemap" element={<HtmlSitemap />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {/* Category Landing Pages */}
              <Route path="/pdf" element={<CategoryPage categoryKey="pdf" />} />
              <Route path="/image" element={<CategoryPage categoryKey="image" />} />
              <Route path="/text" element={<CategoryPage categoryKey="text" />} />
              <Route path="/developer" element={<CategoryPage categoryKey="developer" />} />
              <Route path="/ai" element={<CategoryPage categoryKey="ai" />} />
              <Route path="/qr-barcode" element={<CategoryPage categoryKey="qr-barcode" />} />
              <Route path="/calculators" element={<CategoryPage categoryKey="calculators" />} />
              <Route path="/security" element={<CategoryPage categoryKey="security" />} />

              {/* Mapped Programmatic Tool Routes */}
              {Object.entries(toolLoaders).map(([path, Component]) => (
                <Route 
                  key={path} 
                  path={path} 
                  element={<ToolLayout><Component /></ToolLayout>} 
                />
              ))}
              
              {/* 404 Route */}
              <Route path="*" element={<div className="py-20 text-center text-xl text-zinc-500">Page not found</div>} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
