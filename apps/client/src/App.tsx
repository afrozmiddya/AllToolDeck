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
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService").then(m => ({ default: m.TermsOfService })));

// Lazy Load PDF Tools
const PdfMerger = React.lazy(() => import("./features/pdf/PdfMerger").then(m => ({ default: m.PdfMerger })));
const SplitPDF = React.lazy(() => import("./features/pdf/SplitPDF").then(m => ({ default: m.SplitPDF })));
const CompressPDF = React.lazy(() => import("./features/pdf/CompressPDF").then(m => ({ default: m.CompressPDF })));
const RotatePDF = React.lazy(() => import("./features/pdf/RotatePDF").then(m => ({ default: m.RotatePDF })));
const PDFToJPG = React.lazy(() => import("./features/pdf/PDFToJPG").then(m => ({ default: m.PDFToJPG })));
const JPGToPDF = React.lazy(() => import("./features/pdf/JPGToPDF").then(m => ({ default: m.JPGToPDF })));
const ProtectPDF = React.lazy(() => import("./features/pdf/ProtectPDF").then(m => ({ default: m.ProtectPDF })));
const UnlockPDF = React.lazy(() => import("./features/pdf/UnlockPDF").then(m => ({ default: m.UnlockPDF })));
const PDFToWord = React.lazy(() => import("./features/pdf/PDFToWord").then(m => ({ default: m.PDFToWord })));
const WordToPDF = React.lazy(() => import("./features/pdf/WordToPDF").then(m => ({ default: m.WordToPDF })));

// Lazy Load Image Tools
const ImageConverter = React.lazy(() => import("./features/image/ImageConverter").then(m => ({ default: m.ImageConverter })));
const ResizeImage = React.lazy(() => import("./features/image/ResizeImage").then(m => ({ default: m.ResizeImage })));
const CompressImage = React.lazy(() => import("./features/image/CompressImage").then(m => ({ default: m.CompressImage })));
const CropImage = React.lazy(() => import("./features/image/CropImage").then(m => ({ default: m.CropImage })));
const RotateImage = React.lazy(() => import("./features/image/RotateImage").then(m => ({ default: m.RotateImage })));
const BackgroundRemover = React.lazy(() => import("./features/image/BackgroundRemover").then(m => ({ default: m.BackgroundRemover })));
const ImageToPDF = React.lazy(() => import("./features/image/ImageToPDF").then(m => ({ default: m.ImageToPDF })));

// Lazy Load Text Tools
const WordCounter = React.lazy(() => import("./features/text/WordCounter").then(m => ({ default: m.WordCounter })));
const JsonFormatter = React.lazy(() => import("./features/text/JsonFormatter").then(m => ({ default: m.JsonFormatter })));
const CaseConverter = React.lazy(() => import("./features/text/CaseConverter").then(m => ({ default: m.CaseConverter })));
const RemoveExtraSpaces = React.lazy(() => import("./features/text/RemoveExtraSpaces").then(m => ({ default: m.RemoveExtraSpaces })));
const RemoveDuplicateLines = React.lazy(() => import("./features/text/RemoveDuplicateLines").then(m => ({ default: m.RemoveDuplicateLines })));
const ReverseText = React.lazy(() => import("./features/text/ReverseText").then(m => ({ default: m.ReverseText })));
const SortLines = React.lazy(() => import("./features/text/SortLines").then(m => ({ default: m.SortLines })));
const SlugGenerator = React.lazy(() => import("./features/text/SlugGenerator").then(m => ({ default: m.SlugGenerator })));
const LoremIpsumGenerator = React.lazy(() => import("./features/text/LoremIpsumGenerator").then(m => ({ default: m.LoremIpsumGenerator })));
const TextDifferenceChecker = React.lazy(() => import("./features/text/TextDifferenceChecker").then(m => ({ default: m.TextDifferenceChecker })));

// Lazy Load Security Tools
const PasswordGenerator = React.lazy(() => import("./features/security/PasswordGenerator").then(m => ({ default: m.PasswordGenerator })));
const PasswordStrengthChecker = React.lazy(() => import("./features/security/PasswordStrengthChecker").then(m => ({ default: m.PasswordStrengthChecker })));
const Base64Converter = React.lazy(() => import("./features/security/Base64Converter").then(m => ({ default: m.Base64Converter })));
const SHA256Generator = React.lazy(() => import("./features/security/SHA256Generator").then(m => ({ default: m.SHA256Generator })));
const MD5Generator = React.lazy(() => import("./features/security/MD5Generator").then(m => ({ default: m.MD5Generator })));
const URLEncoderDecoder = React.lazy(() => import("./features/security/URLEncoderDecoder").then(m => ({ default: m.URLEncoderDecoder })));
const JWTDecoder = React.lazy(() => import("./features/security/JWTDecoder").then(m => ({ default: m.JWTDecoder })));
const QRCodeGenerator = React.lazy(() => import("./features/security/QRCodeGenerator").then(m => ({ default: m.QRCodeGenerator })));
const QRCodeScanner = React.lazy(() => import("./features/security/QRCodeScanner").then(m => ({ default: m.QRCodeScanner })));

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
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {/* Dynamic Category Landing Pages */}
              <Route path="/pdf" element={<CategoryPage categoryKey="pdf" />} />
              <Route path="/image" element={<CategoryPage categoryKey="image" />} />
              <Route path="/text" element={<CategoryPage categoryKey="text" />} />
              <Route path="/developer" element={<CategoryPage categoryKey="developer" />} />
              <Route path="/ai" element={<CategoryPage categoryKey="ai" />} />
              <Route path="/qr-barcode" element={<CategoryPage categoryKey="qr-barcode" />} />
              <Route path="/calculators" element={<CategoryPage categoryKey="calculators" />} />
              <Route path="/security" element={<CategoryPage categoryKey="security" />} />

              {/* PDF Tool Routes */}
              <Route path="/pdf/merge" element={<ToolLayout><PdfMerger /></ToolLayout>} />
              <Route path="/pdf/split" element={<ToolLayout><SplitPDF /></ToolLayout>} />
              <Route path="/pdf/compress" element={<ToolLayout><CompressPDF /></ToolLayout>} />
              <Route path="/pdf/rotate" element={<ToolLayout><RotatePDF /></ToolLayout>} />
              <Route path="/pdf/to-jpg" element={<ToolLayout><PDFToJPG /></ToolLayout>} />
              <Route path="/pdf/from-jpg" element={<ToolLayout><JPGToPDF /></ToolLayout>} />
              <Route path="/pdf/protect" element={<ToolLayout><ProtectPDF /></ToolLayout>} />
              <Route path="/pdf/unlock" element={<ToolLayout><UnlockPDF /></ToolLayout>} />
              <Route path="/pdf/to-word" element={<ToolLayout><PDFToWord /></ToolLayout>} />
              <Route path="/pdf/from-word" element={<ToolLayout><WordToPDF /></ToolLayout>} />
              
              {/* Image Tool Routes */}
              <Route path="/image/convert" element={<ToolLayout><ImageConverter /></ToolLayout>} />
              <Route path="/image/resize" element={<ToolLayout><ResizeImage /></ToolLayout>} />
              <Route path="/image/compress" element={<ToolLayout><CompressImage /></ToolLayout>} />
              <Route path="/image/crop" element={<ToolLayout><CropImage /></ToolLayout>} />
              <Route path="/image/rotate" element={<ToolLayout><RotateImage /></ToolLayout>} />
              <Route path="/image/background-remover" element={<ToolLayout><BackgroundRemover /></ToolLayout>} />
              <Route path="/image/to-pdf" element={<ToolLayout><ImageToPDF /></ToolLayout>} />
              
              {/* Text Tool Routes */}
              <Route path="/text/word-counter" element={<ToolLayout><WordCounter /></ToolLayout>} />
              <Route path="/text/json-formatter" element={<ToolLayout><JsonFormatter /></ToolLayout>} />
              <Route path="/text/case-converter" element={<ToolLayout><CaseConverter /></ToolLayout>} />
              <Route path="/text/remove-spaces" element={<ToolLayout><RemoveExtraSpaces /></ToolLayout>} />
              <Route path="/text/remove-duplicates" element={<ToolLayout><RemoveDuplicateLines /></ToolLayout>} />
              <Route path="/text/reverse" element={<ToolLayout><ReverseText /></ToolLayout>} />
              <Route path="/text/sort" element={<ToolLayout><SortLines /></ToolLayout>} />
              <Route path="/text/slug-generator" element={<ToolLayout><SlugGenerator /></ToolLayout>} />
              <Route path="/text/lorem-ipsum" element={<ToolLayout><LoremIpsumGenerator /></ToolLayout>} />
              <Route path="/text/difference" element={<ToolLayout><TextDifferenceChecker /></ToolLayout>} />

              {/* Security Tool Routes */}
              <Route path="/security/password-generator" element={<ToolLayout><PasswordGenerator /></ToolLayout>} />
              <Route path="/security/password-strength" element={<ToolLayout><PasswordStrengthChecker /></ToolLayout>} />
              <Route path="/security/base64" element={<ToolLayout><Base64Converter /></ToolLayout>} />
              <Route path="/security/sha256" element={<ToolLayout><SHA256Generator /></ToolLayout>} />
              <Route path="/security/md5" element={<ToolLayout><MD5Generator /></ToolLayout>} />
              <Route path="/security/url" element={<ToolLayout><URLEncoderDecoder /></ToolLayout>} />
              <Route path="/security/jwt" element={<ToolLayout><JWTDecoder /></ToolLayout>} />
              <Route path="/security/qr-generator" element={<ToolLayout><QRCodeGenerator /></ToolLayout>} />
              <Route path="/security/qr-scanner" element={<ToolLayout><QRCodeScanner /></ToolLayout>} />
              
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
