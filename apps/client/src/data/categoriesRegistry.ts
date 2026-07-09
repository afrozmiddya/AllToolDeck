export interface CategorySEOSection {
  heading: string;
  text: string;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  title: string;
  description: string;
  toolTags: string[]; // matches category name or custom tags in toolsRegistry
  content: CategorySEOSection[];
  faqs: { question: string; answer: string }[];
}

export const categoriesRegistry: Record<string, CategoryInfo> = {
  "pdf": {
    slug: "pdf",
    name: "PDF Tools",
    title: "Free PDF Tools Online - Merge, Split, Compress PDFs | AllToolDeck",
    description: "Access our collection of free online PDF utilities. Merge, split, rotate, convert, protect, and compress PDF files securely in your web browser. Zero server uploads.",
    toolTags: ["PDF"],
    content: [
      {
        heading: "Secure Browser-Based PDF Manipulation",
        text: "Managing PDF documents often raises security concerns because most online PDF converter websites require uploading your documents to remote cloud storage. On AllToolDeck, we eliminate this risk. Our suite of PDF utilities runs entirely client-side using JavaScript. Your files never leave your computer, making it the safest solution for processing sensitive financial worksheets, legal forms, and private records."
      },
      {
        heading: "Comprehensive PDF Solutions Without Limits",
        text: "Whether you need to combine files or compress bloated spreadsheets, our utilities cover every requirement: PDF Merger lets you reorder and join pages cleanly; Split PDF divides documents at precise pages; PDF Compressor optimizes metadata trees to shrink file sizes; PDF to Word parses characters cleanly; and JPG to PDF wraps pictures into document templates. All of these features are completely free with no usage limits."
      },
      {
        heading: "Why Client-Side PDF Processing is Better",
        text: "Traditional document servers suffer from heavy load delays and queuing. By executing the conversion scripts directly inside your browser tab (powered by WebAssembly), AllToolDeck converts files at native CPU speeds. This means instant downloads, zero wait times, and offline operational support."
      }
    ],
    faqs: [
      {
        question: "Is there a limit on the number of PDFs I can process?",
        answer: "No. Since AllToolDeck processes all documents locally in your browser, there are no bandwidth or queue limitations. You can merge, split, or convert as many documents as your device's memory supports."
      },
      {
        question: "Are my documents secure?",
        answer: "Absolutely. We do not upload your files to any remote server. The processing happens entirely within your web browser."
      }
    ]
  },
  "image": {
    slug: "image",
    name: "Image Tools",
    title: "Free Image Tools Online - Resize, Compress, Convert Images | AllToolDeck",
    description: "Scale, convert, compress, crop, and edit images instantly in your web browser. Safely convert between JPG, PNG, and WebP with zero quality degradation.",
    toolTags: ["Image"],
    content: [
      {
        heading: "Lightning Fast Image Formatting & Editing",
        text: "Need to optimize assets for web performance or crop a profile photo? Our suite of online image tools executes everything client-side in seconds. You can resize pixel dimensions, compress size files, rotate orientations, crop borders, and convert formats without any upload latency or server-side compression artifacts."
      },
      {
        heading: "Convert JPG, PNG, and WebP Instantly",
        text: "Format compatibility is critical for web design and app compatibility. Our dynamic Image Converter supports high-speed conversion between PNG (great for transparency), JPG (standard photo layout), and WebP (next-generation small size optimization). The conversion logic uses browser canvas rendering to output files without quality loss."
      },
      {
        heading: "AI Background Removal Running on Your Machine",
        text: "Our Background Remover runs machine learning models natively using your local GPU via WebGL. Unlike other AI background erasers that charge subscription fees and transfer images to cloud APIs, AllToolDeck extracts subjects locally, keeping your family photos and portrait designs completely private."
      }
    ],
    faqs: [
      {
        question: "How does local image conversion preserve quality?",
        answer: "We draw inputs onto high-resolution HTML5 canvases and extract them at selected quality settings. This maintains pixel accuracy and prevents compression degradation."
      },
      {
        question: "Why does background removal take a few seconds on first run?",
        answer: "The AI model is downloaded to your browser cache on first use. Subsequent runs will use the cached model and process your images almost instantly."
      }
    ]
  },
  "text": {
    slug: "text",
    name: "Text Tools",
    title: "Free Text Tools Online - Format, Count, Analyze Strings | AllToolDeck",
    description: "Format JSON, count words, check text difference, converter case, clean spaces, and alphabetize lists online safely.",
    toolTags: ["Text"],
    content: [
      {
        heading: "Text Analysis and String Utilities",
        text: "Our text category features critical day-to-day tools to sanitize, inspect, and format text arrays. Whether you are an editor validating essay parameters, a copywriter counting character spaces, or a developer comparing file variants, our utilities provide clean, fast results."
      },
      {
        heading: "JSON Formatting & Diff Inspection",
        text: "Developers can paste messy JSON blocks into our formatter to validate syntax structures and indent spacing. If you need to spot code variations, the Difference Checker highlights edits (additions and deletions) in side-by-side columns instantly. This is extremely secure, ensuring private credentials or API keys in the text never leak."
      },
      {
        heading: "Clean Spacing and Case Converters",
        text: "Clean up formatting errors by removing duplicate spaces, trailing carriage returns, or blank lines. The Case Converter shifts character strings between uppercase, lowercase, title case, and sentence case. The Slug Generator converts text titles into SEO-friendly path components."
      }
    ],
    faqs: [
      {
        question: "Does the Word Counter calculate reading time?",
        answer: "Yes, it estimates reading times in minutes using standard adult reading speeds (~200 words per minute), helping writers target specific publishing lengths."
      },
      {
        question: "Can I compare code snippets in the Diff Checker?",
        answer: "Absolutely. The Diff Checker handles code lines, formatting tags, or standard paragraphs, displaying precise changes in red and green."
      }
    ]
  },
  "developer": {
    slug: "developer",
    name: "Developer Tools",
    title: "Free Web Developer Tools Online - Format JSON, Base64 | AllToolDeck",
    description: "Format JSON, encode Base64, parse JWT, compute SHA-256 and MD5, and encode URLs securely in your browser.",
    toolTags: ["developer", "JSON Formatter", "Base64 Converter", "SHA-256 Hash Generator", "MD5 Hash Generator", "URL Encoder/Decoder", "JWT Decoder", "Slug Generator"],
    content: [
      {
        heading: "Privacy-Safe Developer Utilities",
        text: "Every developer regularly needs to format JSON, decode tokens, encode URL parameters, or generate hash checksums. However, pasting internal configuration details or security keys into unknown online tool websites is a severe security risk. AllToolDeck provides a sandbox environment: all formatting, parsing, and hashing runs locally in your browser memory."
      },
      {
        heading: "JWT Decoding and Cryptographic Hashing",
        text: "Parse JSON Web Tokens (JWT) locally to verify headers, payload claims, and signature hashes without sharing authorization tokens. Calculate secure SHA-256 hashes and MD5 checksums instantly using standard browser cryptographic modules, ensuring your keys remain secure."
      },
      {
        heading: "URL Sanitization and Base64 Conversions",
        text: "Easily URL-encode special characters for query parameters, or base64-encode binary strings for layout resources. All tool inputs are processed immediately with zero network overhead."
      }
    ],
    faqs: [
      {
        question: "Is JWT parsing secure on this site?",
        answer: "Yes. JWT decoding is performed 100% in JavaScript on your local machine. No data is sent over the network, keeping your credentials safe."
      },
      {
        question: "Can I generate hashes for large data packages?",
        answer: "Yes. All tool operations run inside your browser tab, meaning hash calculations depend solely on your computer's speed."
      }
    ]
  },
  "ai": {
    slug: "ai",
    name: "AI Tools",
    title: "Free Browser AI Tools Online - AI Background Eraser | AllToolDeck",
    description: "Execute machine learning and artificial intelligence tasks directly in your browser. Remove backgrounds with zero latency.",
    toolTags: ["ai", "Background Remover"],
    content: [
      {
        heading: "The Power of Client-Side Artificial Intelligence",
        text: "Cloud-based AI processing is expensive, slow, and compromises your privacy. AllToolDeck is pioneering client-side AI. By running models locally inside your browser via WebGL and ONNX runtime layers, we provide fast, secure, and private AI utility processing."
      },
      {
        heading: "Automated AI Background Removal",
        text: "Our core AI tool is the Background Remover, which uses deep learning segmentation models to detect foreground subjects and isolate backgrounds. The processing runs directly in your tab without sending photos to cloud servers."
      },
      {
        heading: "WebGL Hardware Acceleration",
        text: "We use WebGL to harness your GPU for fast AI inference, allowing you to crop and isolate images in seconds."
      }
    ],
    faqs: [
      {
        question: "Do I need a special graphics card for browser AI?",
        answer: "No. Any modern smartphone, laptop, or desktop with standard GPU chips and WebGL support will run our client-side AI models smoothly."
      },
      {
        question: "How big are the AI models?",
        answer: "The models are optimized for web usage (typically under 10MB) and are cached locally after the first load."
      }
    ]
  },
  "qr-barcode": {
    slug: "qr-barcode",
    name: "QR & Barcode Tools",
    title: "Free QR Code Generator & Scanner Online | AllToolDeck",
    description: "Generate custom downloadable QR codes and scan QR images securely in your browser. High-contrast QR processing.",
    toolTags: ["qr-barcode", "QR Code Generator", "QR Code Scanner"],
    content: [
      {
        heading: "Create and Decode QR Codes Instantly",
        text: "QR codes are essential for mobile redirects, contact sharing, and digital links. Our QR tools provide a complete lifecycle solution: generate custom QR codes or scan existing images client-side."
      },
      {
        heading: "High-Contrast QR Code Generator",
        text: "Generate QR codes for text, URLs, or contact info. Customize sizes and download as high-contrast PNG files instantly."
      },
      {
        heading: "Client-Side QR Image Scanner",
        text: "Scan QR codes by uploading images. The scanning logic analyzes pixels locally, keeping your links private."
      }
    ],
    faqs: [
      {
        question: "Do the generated QR codes expire?",
        answer: "No. They contain your text directly and will work indefinitely."
      },
      {
        question: "Can I scan QR codes using my webcam?",
        answer: "Currently, we support scanning uploaded images. Camera scanning support is planned for future versions."
      }
    ]
  },
  "calculators": {
    slug: "calculators",
    name: "Calculators",
    title: "Free Utility Calculators Online - Word Counter, Password strength | AllToolDeck",
    description: "Calculate text metrics, check password strength entropy, and test complexity locally in your browser.",
    toolTags: ["calculators", "Word & Character Counter", "Password Strength Checker"],
    content: [
      {
        heading: "Secure Utility Calculators",
        text: "Calculate character counts or password strength metrics securely in your browser without transmitting data over the network."
      },
      {
        heading: "Password Strength & Entropy Calculator",
        text: "Measure password strength using zxcvbn to calculate cracking times against brute-force attacks."
      },
      {
        heading: "Text Metric Calculations",
        text: "Count paragraphs, sentences, and words in real-time, helping you optimize publishing lengths."
      }
    ],
    faqs: [
      {
        question: "How secure is password strength checking?",
        answer: "Very secure. The analysis runs completely locally in your browser. Your password is never sent to any server."
      }
    ]
  }
};
