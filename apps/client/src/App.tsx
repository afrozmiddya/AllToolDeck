import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/common/Layout";
import { motion } from "framer-motion";
import { 
  FileText, Image as ImageIcon, Type, Shield, 
  ArrowRight, Zap, CheckCircle2, Lock 
} from "lucide-react";

import { WordCounter } from "./features/text/WordCounter";
import { JsonFormatter } from "./features/text/JsonFormatter";
import { CaseConverter } from "./features/text/CaseConverter";
import { RemoveExtraSpaces } from "./features/text/RemoveExtraSpaces";
import { RemoveDuplicateLines } from "./features/text/RemoveDuplicateLines";
import { ReverseText } from "./features/text/ReverseText";
import { SortLines } from "./features/text/SortLines";
import { SlugGenerator } from "./features/text/SlugGenerator";
import { LoremIpsumGenerator } from "./features/text/LoremIpsumGenerator";
import { TextDifferenceChecker } from "./features/text/TextDifferenceChecker";

import { PasswordGenerator } from "./features/security/PasswordGenerator";
import { Base64Converter } from "./features/security/Base64Converter";
import { SHA256Generator } from "./features/security/SHA256Generator";
import { MD5Generator } from "./features/security/MD5Generator";
import { URLEncoderDecoder } from "./features/security/URLEncoderDecoder";
import { PasswordStrengthChecker } from "./features/security/PasswordStrengthChecker";
import { JWTDecoder } from "./features/security/JWTDecoder";
import { QRCodeGenerator } from "./features/security/QRCodeGenerator";
import { QRCodeScanner } from "./features/security/QRCodeScanner";

import { PdfMerger } from "./features/pdf/PdfMerger";
import { SplitPDF } from "./features/pdf/SplitPDF";
import { CompressPDF } from "./features/pdf/CompressPDF";
import { RotatePDF } from "./features/pdf/RotatePDF";
import { PDFToJPG } from "./features/pdf/PDFToJPG";
import { JPGToPDF } from "./features/pdf/JPGToPDF";
import { ProtectPDF } from "./features/pdf/ProtectPDF";
import { UnlockPDF } from "./features/pdf/UnlockPDF";
import { PDFToWord } from "./features/pdf/PDFToWord";
import { WordToPDF } from "./features/pdf/WordToPDF";

import { ImageConverter } from "./features/image/ImageConverter";
import { ResizeImage } from "./features/image/ResizeImage";
import { CompressImage } from "./features/image/CompressImage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CropImage } from "./features/image/CropImage";
import { RotateImage } from "./features/image/RotateImage";
import { BackgroundRemover } from "./features/image/BackgroundRemover";
import { ImageToPDF } from "./features/image/ImageToPDF";

// Initialize TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

interface AnimatedCardProps {
  to: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  category?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ to, title, description, icon, category }) => (
  <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
    <Link to={to} className="group relative flex flex-col h-full p-6 border border-border rounded-2xl bg-surface/40 backdrop-blur-sm shadow-sm transition-all duration-200 hover:shadow-primary/5 hover:border-primary/50 overflow-hidden cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-background border border-border text-primary group-hover:scale-110 transition-transform duration-300">
          {icon || <CheckCircle2 className="w-5 h-5" />}
        </div>
        {category && (
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-muted bg-background px-2 py-1 rounded-md border border-border">
            {category}
          </span>
        )}
      </div>
      <div className="relative z-10 flex-1">
        <h3 className="font-heading font-semibold text-lg mb-2 text-text group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted line-clamp-2">{description}</p>
      </div>
      <div className="relative z-10 mt-4 flex items-center text-primary text-sm font-medium opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        Open Tool <ArrowRight className="ml-1 w-4 h-4" />
      </div>
    </Link>
  </motion.div>
);

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <div className="flex flex-col items-center justify-center text-center py-20 lg:py-32 relative">
                {/* Hero Content */}
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-sm text-muted mb-8"
                  >
                    <span className="flex w-2 h-2 rounded-full bg-success animate-pulse" />
                    v1.0 is now live
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                  >
                    The Ultimate <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                      Productivity Suite
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted max-w-2xl mb-10"
                  >
                    Fast, secure, and privacy-focused utilities for developers and creators. Process PDFs, images, and text entirely in your browser.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                  >
                    <Link to="/pdf" className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 group cursor-pointer">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {/* <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-surface border border-border text-text font-medium hover:bg-surface/80 transition-all active:scale-95 cursor-pointer">
                      View on GitHub
                    </a> */}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-8 mt-16 text-muted text-sm"
                  >
                    <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Lightning Fast</div>
                    <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-success" /> Secure & Private</div>
                    <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-accent" /> Zero Tracking</div>
                  </motion.div>
                </div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 w-full max-w-6xl relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatedCard to="/pdf" title="PDF Tools" description="Merge, split, compress, and secure documents." icon={<FileText className="w-5 h-5"/>} category="10 Tools" />
                  <AnimatedCard to="/image" title="Image Tools" description="Resize, compress, convert, and edit images." icon={<ImageIcon className="w-5 h-5"/>} category="10 Tools" />
                  <AnimatedCard to="/text" title="Text Tools" description="Format, analyze, and manipulate strings." icon={<Type className="w-5 h-5"/>} category="10 Tools" />
                  <AnimatedCard to="/security" title="Security Tools" description="Hash, encode, decode, and generate passwords." icon={<Lock className="w-5 h-5"/>} category="10 Tools" />
                </motion.div>
              </div>
            } />
            
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Category Placeholder Routes */}
            <Route path="/pdf" element={
              <div className="space-y-8 relative z-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-heading font-bold tracking-tight mb-4 text-text">PDF Tools</h1>
                  <p className="text-lg text-muted">Merge, compress, and manipulate PDF documents entirely securely in your browser.</p>
                </div>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatedCard to="/pdf/merge" title="Merge PDFs" description="Combine multiple PDF files into one securely." />
                  <AnimatedCard to="/pdf/split" title="Split PDF" description="Split a single PDF file into two documents." />
                  <AnimatedCard to="/pdf/compress" title="Compress PDF" description="Reduce PDF file size by stripping metadata." />
                  <AnimatedCard to="/pdf/rotate" title="Rotate PDF" description="Rotate all pages in your document instantly." />
                  <AnimatedCard to="/pdf/to-jpg" title="PDF to JPG" description="Convert PDF pages into high-quality images." />
                  <AnimatedCard to="/pdf/from-jpg" title="JPG to PDF" description="Instantly convert an image to a PDF." />
                  <AnimatedCard to="/pdf/protect" title="Protect PDF" description="Add a password to restrict access." />
                  <AnimatedCard to="/pdf/unlock" title="Unlock PDF" description="Remove password protection from a PDF." />
                  <AnimatedCard to="/pdf/to-word" title="PDF to Word" description="Extract text from your PDF into a Word Doc." />
                  <AnimatedCard to="/pdf/from-word" title="Word to PDF" description="Convert Microsoft Word documents to PDF." />
                </motion.div>
              </div>
            } />
            <Route path="/pdf/merge" element={<PdfMerger />} />
            <Route path="/pdf/split" element={<SplitPDF />} />
            <Route path="/pdf/compress" element={<CompressPDF />} />
            <Route path="/pdf/rotate" element={<RotatePDF />} />
            <Route path="/pdf/to-jpg" element={<PDFToJPG />} />
            <Route path="/pdf/from-jpg" element={<JPGToPDF />} />
            <Route path="/pdf/protect" element={<ProtectPDF />} />
            <Route path="/pdf/unlock" element={<UnlockPDF />} />
            <Route path="/pdf/to-word" element={<PDFToWord />} />
            <Route path="/pdf/from-word" element={<WordToPDF />} />
            
            <Route path="/image" element={
              <div className="space-y-8 relative z-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-heading font-bold tracking-tight mb-4 text-text">Image Tools</h1>
                  <p className="text-lg text-muted">Fast, local utilities to format, resize, and convert images without uploading to a server.</p>
                </div>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatedCard to="/image/convert?from=jpg&to=png" title="JPG to PNG" description="Convert JPEG images into PNG format." />
                  <AnimatedCard to="/image/convert?from=png&to=jpg" title="PNG to JPG" description="Convert PNG images into JPEG format." />
                  <AnimatedCard to="/image/convert?from=webp&to=png" title="WEBP to PNG" description="Convert WEBP images into PNG format." />
                  <AnimatedCard to="/image/convert?from=png&to=webp" title="PNG to WEBP" description="Convert PNG images into WEBP format." />
                  <AnimatedCard to="/image/resize" title="Resize Image" description="Scale an image to your exact dimensions in pixels." />
                  <AnimatedCard to="/image/compress" title="Compress Image" description="Reduce image file size while maintaining quality." />
                  <AnimatedCard to="/image/crop" title="Crop Image" description="Select an area of your image to crop out." />
                  <AnimatedCard to="/image/rotate" title="Rotate Image" description="Rotate an image clockwise or counter-clockwise." />
                  <AnimatedCard to="/image/background-remover" title="Background Remover" description="Automatically remove image backgrounds via AI." />
                  <AnimatedCard to="/image/to-pdf" title="Image to PDF" description="Convert a PNG or JPEG image into a PDF document." />
                </motion.div>
              </div>
            } />
            <Route path="/image/convert" element={<ImageConverter />} />
            <Route path="/image/resize" element={<ResizeImage />} />
            <Route path="/image/compress" element={<CompressImage />} />
            <Route path="/image/crop" element={<CropImage />} />
            <Route path="/image/rotate" element={<RotateImage />} />
            <Route path="/image/background-remover" element={<BackgroundRemover />} />
            <Route path="/image/to-pdf" element={<ImageToPDF />} />
            
            <Route path="/text" element={
              <div className="space-y-8 relative z-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-heading font-bold tracking-tight mb-4 text-text">Text Tools</h1>
                  <p className="text-lg text-muted">A collection of utilities to analyze, format, and manipulate strings instantly in your browser.</p>
                </div>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatedCard to="/text/word-counter" title="Word & Character Counter" description="Count words, characters, sentences, and paragraphs." />
                  <AnimatedCard to="/text/json-formatter" title="JSON Formatter" description="Format, validate, and minify JSON strings." />
                  <AnimatedCard to="/text/case-converter" title="Case Converter" description="Change text between upper, lower, title, and sentence case." />
                  <AnimatedCard to="/text/remove-spaces" title="Remove Extra Spaces" description="Clean up text by removing consecutive spaces." />
                  <AnimatedCard to="/text/remove-duplicates" title="Remove Duplicate Lines" description="Find and remove duplicate lines from a list." />
                  <AnimatedCard to="/text/reverse" title="Reverse Text" description="Reverse strings by letter, word, or line." />
                  <AnimatedCard to="/text/sort" title="Sort Lines" description="Alphabetize a list of items instantly." />
                  <AnimatedCard to="/text/slug-generator" title="Slug Generator" description="Convert strings into URL-friendly slugs." />
                  <AnimatedCard to="/text/lorem-ipsum" title="Lorem Ipsum Generator" description="Generate placeholder text for mockups." />
                  <AnimatedCard to="/text/difference" title="Text Difference Checker" description="Highlight differences between two text strings." />
                </motion.div>
              </div>
            } />
            <Route path="/text/word-counter" element={<WordCounter />} />
            <Route path="/text/json-formatter" element={<JsonFormatter />} />
            <Route path="/text/case-converter" element={<CaseConverter />} />
            <Route path="/text/remove-spaces" element={<RemoveExtraSpaces />} />
            <Route path="/text/remove-duplicates" element={<RemoveDuplicateLines />} />
            <Route path="/text/reverse" element={<ReverseText />} />
            <Route path="/text/sort" element={<SortLines />} />
            <Route path="/text/slug-generator" element={<SlugGenerator />} />
            <Route path="/text/lorem-ipsum" element={<LoremIpsumGenerator />} />
            <Route path="/text/difference" element={<TextDifferenceChecker />} />

            <Route path="/security" element={
              <div className="space-y-8 relative z-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-heading font-bold tracking-tight mb-4 text-text">Security Tools</h1>
                  <p className="text-lg text-muted">Generate secure passwords, hash data, and encode strings locally on your machine.</p>
                </div>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatedCard to="/security/password-generator" title="Password Generator" description="Create ultra-secure, randomized passwords locally." />
                  <AnimatedCard to="/security/password-strength" title="Password Strength Checker" description="Test the crack-resistance of your passwords." />
                  <AnimatedCard to="/security/base64?mode=encode" title="Base64 Encode" description="Safely encode text strings to Base64." />
                  <AnimatedCard to="/security/base64?mode=decode" title="Base64 Decode" description="Safely decode Base64 strings to text." />
                  <AnimatedCard to="/security/sha256" title="SHA-256 Hash Generator" description="Generate secure SHA-256 hashes instantly." />
                  <AnimatedCard to="/security/md5" title="MD5 Hash Generator" description="Generate MD5 checksums for strings." />
                  <AnimatedCard to="/security/url-encoder" title="URL Encoder/Decoder" description="Safely encode or decode strings for URLs." />
                  <AnimatedCard to="/security/jwt" title="JWT Decoder" description="View payload claims inside JSON Web Tokens." />
                  <AnimatedCard to="/security/qr-generator" title="QR Code Generator" description="Convert strings or URLs into QR Codes." />
                  <AnimatedCard to="/security/qr-scanner" title="QR Code Scanner" description="Extract data from uploaded QR Code images." />
                </motion.div>
              </div>
            } />

            <Route path="/security/password-generator" element={<PasswordGenerator />} />
            <Route path="/security/password-strength" element={<PasswordStrengthChecker />} />
            <Route path="/security/base64" element={<Base64Converter />} />
            <Route path="/security/sha256" element={<SHA256Generator />} />
            <Route path="/security/md5" element={<MD5Generator />} />
            <Route path="/security/url" element={<URLEncoderDecoder />} />
            <Route path="/security/jwt" element={<JWTDecoder />} />
            <Route path="/security/qr-generator" element={<QRCodeGenerator />} />
            <Route path="/security/qr-scanner" element={<QRCodeScanner />} />
            
            {/* 404 Route */}
            <Route path="*" element={<div className="py-20 text-center text-xl text-zinc-500">Page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
