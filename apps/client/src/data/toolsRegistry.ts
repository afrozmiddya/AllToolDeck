export interface ToolSEOInfo {
  path: string;
  name: string;
  title: string;
  description: string;
  category: string;
  howToUse: string[];
  faqs: { question: string; answer: string }[];
}

export const toolsRegistry: Record<string, ToolSEOInfo> = {
  // === PDF TOOLS ===
  "/pdf/merge": {
    path: "/pdf/merge",
    name: "Merge PDFs",
    title: "Merge PDFs Free Online - Combine PDF Files | AllToolDeck",
    description: "Combine multiple PDF documents into a single PDF file instantly. Safe, browser-based merging with zero uploads, preserving your privacy.",
    category: "PDF",
    howToUse: [
      "Select and drag multiple PDF documents into the drop zone.",
      "Reorder the selected files if needed (or combine them in default order).",
      "Click the 'Merge PDF' button to begin processing.",
      "Save the merged PDF file directly to your device."
    ],
    faqs: [
      {
        question: "Is merging PDFs on AllToolDeck safe?",
        answer: "Yes. All operations run 100% locally in your web browser. Your files are never uploaded to any external servers, ensuring complete privacy."
      },
      {
        question: "Can I merge password-protected PDFs?",
        answer: "You must first decrypt or unlock password-protected PDF files using our Unlock tool before combining them."
      }
    ]
  },
  "/pdf/split": {
    path: "/pdf/split",
    name: "Split PDF",
    title: "Split PDF Free Online - Split PDF Pages | AllToolDeck",
    description: "Split a single PDF document into two separate PDF files at your designated page. Secure, client-side execution with zero tracking.",
    category: "PDF",
    howToUse: [
      "Upload a PDF file using the file selector or drop zone.",
      "Enter the page number after which you want to split the document.",
      "Click the 'Split PDF' button.",
      "Download both resulting PDF files instantly."
    ],
    faqs: [
      {
        question: "Does splitting PDFs reduce document quality?",
        answer: "No. Splitting extracts pages directly without re-compressing them, maintaining 100% of the original document layout, images, and text quality."
      }
    ]
  },
  "/pdf/compress": {
    path: "/pdf/compress",
    name: "Compress PDF",
    title: "Compress PDF Free Online - Reduce PDF File Size | AllToolDeck",
    description: "Reduce PDF file size by removing redundant structure metadata and title parameters safely in your browser. Complete client-side compression.",
    category: "PDF",
    howToUse: [
      "Drop your PDF document into the designated upload zone.",
      "The utility automatically strips metadata and optimizes the PDF tree structures.",
      "Click the 'Compress PDF' button.",
      "Save the optimized PDF and compare file sizes before and after."
    ],
    faqs: [
      {
        question: "Does PDF compression delete my images?",
        answer: "No. This tool optimizes internal document structures and metadata rather than aggressively compressing images, ensuring your text and assets remain crisp."
      }
    ]
  },
  "/pdf/rotate": {
    path: "/pdf/rotate",
    name: "Rotate PDF",
    title: "Rotate PDF Pages Online - Direct PDF Rotation | AllToolDeck",
    description: "Rotate all pages in your PDF document clockwise or counter-clockwise instantly. Safe browser-based execution with instant downloads.",
    category: "PDF",
    howToUse: [
      "Upload your PDF document.",
      "Select your desired rotation angle (90, 180, or 270 degrees).",
      "Click the 'Rotate PDF' button.",
      "Download the rotated document immediately."
    ],
    faqs: [
      {
        question: "Can I rotate a single page instead of the entire document?",
        answer: "Currently, this tool rotates all pages. For single-page rotation, split the PDF first, rotate the desired page, and merge them back together."
      }
    ]
  },
  "/pdf/to-jpg": {
    path: "/pdf/to-jpg",
    name: "PDF to JPG",
    title: "Convert PDF to JPG Online - Free PDF Image Extraction | AllToolDeck",
    description: "Convert pages of your PDF document into high-resolution JPG images. Runs locally on your machine for complete security.",
    category: "PDF",
    howToUse: [
      "Upload your PDF file.",
      "The tool extracts the first few pages and converts them directly into JPEG frames.",
      "Click download to save the images to your browser download directory."
    ],
    faqs: [
      {
        question: "Are my PDF images saved on your servers?",
        answer: "No. The conversion is done entirely inside your browser using PDF.js. Your document remains on your computer."
      }
    ]
  },
  "/pdf/from-jpg": {
    path: "/pdf/from-jpg",
    name: "JPG to PDF",
    title: "Convert JPG to PDF Online - Free Image PDF Wrapper | AllToolDeck",
    description: "Instantly wrap and convert JPG/JPEG/PNG images into a PDF document. High-speed browser processing with no limitations.",
    category: "PDF",
    howToUse: [
      "Upload your image file (JPEG/PNG supported).",
      "Click the 'Convert to PDF' button.",
      "Save the generated PDF document directly."
    ],
    faqs: [
      {
        question: "Can I upload PNG files as well?",
        answer: "Yes, this converter accepts both JPG and PNG formats and embeds them cleanly inside a PDF page wrapper."
      }
    ]
  },
  "/pdf/protect": {
    path: "/pdf/protect",
    name: "Protect PDF",
    title: "Protect PDF Free Online - Password Encrypt PDF | AllToolDeck",
    description: "Secure your PDF files by adding strong password encryption to restrict viewing. Protect your digital assets client-side.",
    category: "PDF",
    howToUse: [
      "Select the PDF you wish to encrypt.",
      "Set your secure password.",
      "Click 'Encrypt PDF' to build the protected container.",
      "Save the encrypted document."
    ],
    faqs: [
      {
        question: "What encryption is used?",
        answer: "We use standard PDF security handlers (RC4/AES) compatible with Adobe Acrobat and all standard PDF readers."
      }
    ]
  },
  "/pdf/unlock": {
    path: "/pdf/unlock",
    name: "Unlock PDF",
    title: "Unlock PDF Free Online - Remove PDF Passwords | AllToolDeck",
    description: "Remove password security and encryption from your PDF documents. Instant client-side unlock (requires the current password).",
    category: "PDF",
    howToUse: [
      "Upload your password-protected PDF document.",
      "Enter the active password for verification.",
      "The tool decrypts and saves the file without protection.",
      "Download the unlocked PDF."
    ],
    faqs: [
      {
        question: "Can I unlock a PDF if I forgot the password?",
        answer: "No. For safety and security, you must provide the correct password to decrypt and unlock the document."
      }
    ]
  },
  "/pdf/to-word": {
    path: "/pdf/to-word",
    name: "PDF to Word",
    title: "Convert PDF to Word Online - Free Text Extraction | AllToolDeck",
    description: "Convert PDF documents to editable Microsoft Word files. Runs securely in the browser to extract text layout without leaks.",
    category: "PDF",
    howToUse: [
      "Select your PDF document.",
      "The utility parses and extracts the text blocks locally.",
      "Click 'Convert' to download the generated `.docx` file."
    ],
    faqs: [
      {
        question: "Does it extract images too?",
        answer: "This tool focuses on extracting and formatting text structures into document flows. Complex image placement may vary."
      }
    ]
  },
  "/pdf/from-word": {
    path: "/pdf/from-word",
    name: "Word to PDF",
    title: "Convert Word to PDF Online - Free DOCX PDF Maker | AllToolDeck",
    description: "Convert DOCX/DOC Microsoft Word documents to PDF files safely in your browser. Privacy-focused document wrapper.",
    category: "PDF",
    howToUse: [
      "Select a DOCX document.",
      "Click the 'Generate PDF' button.",
      "Save the converted document."
    ],
    faqs: [
      {
        question: "Are my formatting details preserved?",
        answer: "Yes, standard formatting is compiled directly into page layouts for a neat document conversion."
      }
    ]
  },

  // === IMAGE TOOLS ===
  "/image/convert": {
    path: "/image/convert",
    name: "Image Converter",
    title: "Free Image Converter Online - Convert JPG, PNG, WEBP | AllToolDeck",
    description: "Convert image files between JPG, PNG, and WEBP formats immediately. Zero server latency, fully secure local processing.",
    category: "Image",
    howToUse: [
      "Drag and drop your image into the workspace.",
      "Choose your desired output target format (JPG, PNG, or WEBP).",
      "Click 'Convert Image'.",
      "Save the converted image file."
    ],
    faqs: [
      {
        question: "Which formats are supported?",
        answer: "We support converting between JPG/JPEG, PNG, and WebP, which are standard for modern web usage."
      }
    ]
  },
  "/image/resize": {
    path: "/image/resize",
    name: "Resize Image",
    title: "Resize Image Online Free - Scale Image Dimensions | AllToolDeck",
    description: "Scale and resize image dimensions to your exact width and height specifications. Local processing ensures your photos remain private.",
    category: "Image",
    howToUse: [
      "Upload the image you want to resize.",
      "Input your target width and height in pixels.",
      "Click 'Resize' to run the canvas optimization.",
      "Download your scaled image."
    ],
    faqs: [
      {
        question: "Will resizing stretch my image?",
        answer: "You can choose to keep the aspect ratio locked to prevent stretching, scaling the height automatically based on the width."
      }
    ]
  },
  "/image/compress": {
    path: "/image/compress",
    name: "Compress Image",
    title: "Compress Image Online Free - Reduce Image File Size | AllToolDeck",
    description: "Reduce image file sizes instantly while maintaining quality. Adjust quality percentages to hit your target file limits.",
    category: "Image",
    howToUse: [
      "Drop the image file to compress.",
      "Select your target quality percentage using the slider.",
      "Click 'Compress' to generate the reduced image.",
      "Download the compressed photo."
    ],
    faqs: [
      {
        question: "What is the recommended quality value?",
        answer: "For web pages, 70% to 80% offers the best balance, significantly reducing file sizes while keeping quality indistinguishable from original files."
      }
    ]
  },
  "/image/crop": {
    path: "/image/crop",
    name: "Crop Image",
    title: "Crop Image Free Online - Trim Image Frames | AllToolDeck",
    description: "Select and trim specific sections of your photos with our easy-to-use cropping tool. Secure, browser-based editing.",
    category: "Image",
    howToUse: [
      "Upload your image.",
      "Draw the selection area overlay directly on the preview.",
      "Click 'Crop Image'.",
      "Download the trimmed image."
    ],
    faqs: [
      {
        question: "Is the crop ratio customizable?",
        answer: "Yes, you can drag the crop selectors freely to fit any custom dimension or width-to-height ratio."
      }
    ]
  },
  "/image/rotate": {
    path: "/image/rotate",
    name: "Rotate Image",
    title: "Rotate Image Online Free - Flip & Rotate Photos | AllToolDeck",
    description: "Rotate images by any 90-degree angle. Save the adjusted photo directly to your computer with zero compression loss.",
    category: "Image",
    howToUse: [
      "Select your image.",
      "Select your rotation angle clockwise or counter-clockwise.",
      "Click 'Rotate Image'.",
      "Save the updated image."
    ],
    faqs: [
      {
        question: "Can I flip the image horizontally?",
        answer: "Currently, we support rotating in 90-degree increments. Horizontal flip will be added in our next version."
      }
    ]
  },
  "/image/background-remover": {
    path: "/image/background-remover",
    name: "Background Remover",
    title: "AI Background Remover Free Online - Transparent Backgrounds | AllToolDeck",
    description: "Remove image backgrounds automatically using local client-side AI. Process your photos securely without sending data to servers.",
    category: "Image",
    howToUse: [
      "Select an image with a clear foreground object or person.",
      "Click the 'Remove Background' button.",
      "The tool runs an AI model in your browser using WebGL.",
      "Download your transparent PNG."
    ],
    faqs: [
      {
        question: "Why does it require WebGL?",
        answer: "To run the background removal model entirely locally in your browser, we use WebGL for hardware acceleration to process it within seconds."
      }
    ]
  },
  "/image/to-pdf": {
    path: "/image/to-pdf",
    name: "Image to PDF",
    title: "Convert Image to PDF Online - Free Image PDF Maker | AllToolDeck",
    description: "Convert a PNG or JPG photo into a PDF page wrapper instantly. Clean, local browser script with zero tracking.",
    category: "Image",
    howToUse: [
      "Select your JPEG or PNG image.",
      "Click 'Convert to PDF'.",
      "Download your document wrapper."
    ],
    faqs: [
      {
        question: "Does it support multiple images at once?",
        answer: "Currently, this converts one image per PDF. Use the PDF Merge tool if you need to combine multiple converted sheets."
      }
    ]
  },

  // === TEXT TOOLS ===
  "/text/word-counter": {
    path: "/text/word-counter",
    name: "Word & Character Counter",
    title: "Word and Character Counter Online - Real-time Text Metrics | AllToolDeck",
    description: "Count words, characters, sentences, paragraphs, and estimate reading time. Simple, clean, and runs securely in your browser.",
    category: "Text",
    howToUse: [
      "Type or paste your text directly into the input area.",
      "Text metrics are computed and updated in real-time.",
      "View the breakdown of characters, words, sentences, and paragraphs.",
      "Copy your text or count values with ease."
    ],
    faqs: [
      {
        question: "Is there a text length limit?",
        answer: "No. Since it operates client-side, the only limit is your browser's memory capacity. It easily processes documents with hundreds of thousands of words."
      }
    ]
  },
  "/text/json-formatter": {
    path: "/text/json-formatter",
    name: "JSON Formatter",
    title: "JSON Formatter & Validator Online - Format JSON | AllToolDeck",
    description: "Format, validate, debug, and minify JSON strings. Clean up unformatted JSON with customizable tab spacing securely.",
    category: "Text",
    howToUse: [
      "Paste your raw JSON string into the editor.",
      "Click 'Format' to beautify, or 'Minify' to compress JSON.",
      "Check error messages if the JSON is invalid.",
      "Copy the formatted JSON to your clipboard."
    ],
    faqs: [
      {
        question: "What happens if my JSON is invalid?",
        answer: "The validator highlights the syntax error and exact position (line/column) where the parser failed, making debugging easy."
      }
    ]
  },
  "/text/case-converter": {
    path: "/text/case-converter",
    name: "Case Converter",
    title: "Text Case Converter Online - UPPER, lower, Title Case | AllToolDeck",
    description: "Change text cases between uppercase, lowercase, title case, sentence case, and slug case instantly online.",
    category: "Text",
    howToUse: [
      "Paste your text.",
      "Select your target casing format.",
      "Your text converts instantly.",
      "Click copy to save the result."
    ],
    faqs: [
      {
        question: "Does it support Unicode characters?",
        answer: "Yes, standard JavaScript text functions support full Unicode and international character sets."
      }
    ]
  },
  "/text/remove-spaces": {
    path: "/text/remove-spaces",
    name: "Remove Extra Spaces",
    title: "Remove Extra Spaces Online - Text Space Cleaner | AllToolDeck",
    description: "Clean up spacing, remove consecutive spaces, tab spaces, and trailing whitespace from your text instantly.",
    category: "Text",
    howToUse: [
      "Enter your text with messy spacing.",
      "Click 'Remove Extra Spaces'.",
      "Copy the cleaned spacing output."
    ],
    faqs: [
      {
        question: "Does it remove line breaks?",
        answer: "By default, it only cleans up double spaces and trailing spacing, leaving your paragraphs intact."
      }
    ]
  },
  "/text/remove-duplicates": {
    path: "/text/remove-duplicates",
    name: "Remove Duplicate Lines",
    title: "Remove Duplicate Lines Online - List Duplicate Cleaner | AllToolDeck",
    description: "Find and remove duplicate lines from lists or text files. Run list cleanup locally in your browser for absolute security.",
    category: "Text",
    howToUse: [
      "Paste your line list.",
      "Click 'Remove Duplicates'.",
      "Copy the unique line results."
    ],
    faqs: [
      {
        question: "Is the check case-sensitive?",
        answer: "Yes, lines with different cases are treated as distinct unless configured."
      }
    ]
  },
  "/text/reverse": {
    path: "/text/reverse",
    name: "Reverse Text",
    title: "Reverse Text Online - Flip Letters, Words, Lines | AllToolDeck",
    description: "Reverse strings, flip characters, reverse word order, or line order instantly. Standard text tool running locally.",
    category: "Text",
    howToUse: [
      "Enter the text you want to flip.",
      "Choose mode (Reverse Characters, Words, or Lines).",
      "Copy the reversed output."
    ],
    faqs: [
      {
        question: "Can I use it to solve mirror writing?",
        answer: "Yes, reversing characters is perfect for reading mirrored or backwards text."
      }
    ]
  },
  "/text/sort": {
    path: "/text/sort",
    name: "Sort Lines",
    title: "Sort Lines Alphabetically Online - List Sorter | AllToolDeck",
    description: "Sort list items alphabetically (A-Z or Z-A) instantly. Clean up text lists securely in your browser.",
    category: "Text",
    howToUse: [
      "Paste your list (one item per line).",
      "Click 'Sort A-Z' or 'Sort Z-A'.",
      "Copy the sorted list."
    ],
    faqs: [
      {
        question: "Does it sort numbers correctly?",
        answer: "It sorts alphabetically. For alphanumeric sorting, it follows standard dictionary orders."
      }
    ]
  },
  "/text/slug-generator": {
    path: "/text/slug-generator",
    name: "Slug Generator",
    title: "URL Slug Generator - Create Clean Web Slugs | AllToolDeck",
    description: "Convert text titles into clean, lowercase, URL-friendly slugs. Perfect for blogging, SEO, and web development.",
    category: "Text",
    howToUse: [
      "Paste your title or string.",
      "The slug generates instantly with hyphens replacing spaces.",
      "Copy the URL-safe string."
    ],
    faqs: [
      {
        question: "Does it remove special characters?",
        answer: "Yes, all non-alphanumeric characters like commas, periods, and brackets are automatically removed."
      }
    ]
  },
  "/text/lorem-ipsum": {
    path: "/text/lorem-ipsum",
    name: "Lorem Ipsum Generator",
    title: "Lorem Ipsum Generator - Free Placeholder Text | AllToolDeck",
    description: "Generate mock layout placeholder text. Customize word count, sentences, or paragraphs for design mockups.",
    category: "Text",
    howToUse: [
      "Choose number of paragraphs or words to generate.",
      "Click 'Generate'.",
      "Copy the placeholder text."
    ],
    faqs: [
      {
        question: "Is this the standard Cicero text?",
        answer: "Yes, it uses the classic 'Lorem ipsum dolor sit amet' vocabulary for maximum layout realism."
      }
    ]
  },
  "/text/difference": {
    path: "/text/difference",
    name: "Text Difference Checker",
    title: "Text Diff Checker Online - Compare Strings | AllToolDeck",
    description: "Compare two text inputs side by side and highlight differences instantly. Runs client-side for maximum safety.",
    category: "Text",
    howToUse: [
      "Paste the original text in the left pane.",
      "Paste the updated text in the right pane.",
      "The diff tool highlights additions in green and deletions in red.",
      "Compare modifications line by line."
    ],
    faqs: [
      {
        question: "How secure is the diff checker?",
        answer: "Unlike other comparison sites, all processing happens locally. Your draft contents never touch a database."
      }
    ]
  },

  // === SECURITY TOOLS ===
  "/security/password-generator": {
    path: "/security/password-generator",
    name: "Password Generator",
    title: "Strong Password Generator Online - Random Password Maker | AllToolDeck",
    description: "Generate ultra-secure, randomized passwords locally on your machine. Select lengths, symbols, numbers, and uppercase rules.",
    category: "Security",
    howToUse: [
      "Select target password length.",
      "Check criteria rules (numbers, uppercase letters, special symbols).",
      "Click 'Generate Password'.",
      "Copy your secure password."
    ],
    faqs: [
      {
        question: "Are generated passwords stored?",
        answer: "No. The password generator runs locally in your browser using cryptographically secure random number generators. We never store or see your passwords."
      }
    ]
  },
  "/security/password-strength": {
    path: "/security/password-strength",
    name: "Password Strength Checker",
    title: "Password Strength Validator - Test Entropy Online | AllToolDeck",
    description: "Test password complexity, crack-resistance, and feedback reports locally using the zxcvbn library.",
    category: "Security",
    howToUse: [
      "Type a password to test.",
      "Check strength scores, estimated crack times, and safety recommendations.",
      "Modify your password based on recommendations to improve score."
    ],
    faqs: [
      {
        question: "Is it safe to test my real password?",
        answer: "Yes, because the zxcvbn analysis algorithm runs completely locally. Nothing is sent over the network."
      }
    ]
  },
  "/security/base64": {
    path: "/security/base64",
    name: "Base64 Converter",
    title: "Base64 Encoder and Decoder Online - Free Utility | AllToolDeck",
    description: "Encode strings to Base64 or decode Base64 back to text instantly. Secure client-side conversion.",
    category: "Security",
    howToUse: [
      "Paste your text into the workspace.",
      "Select 'Encode' or 'Decode' mode.",
      "Copy the converted string."
    ],
    faqs: [
      {
        question: "What is Base64 used for?",
        answer: "Base64 is widely used to represent binary data in text environments, like embedding images in HTML/CSS."
      }
    ]
  },
  "/security/sha256": {
    path: "/security/sha256",
    name: "SHA-256 Hash Generator",
    title: "SHA-256 Hash Generator Online - Hash Calculator | AllToolDeck",
    description: "Calculate SHA-256 hashes instantly for standard text strings. Client-side checksum calculations.",
    category: "Security",
    howToUse: [
      "Type or paste your text input.",
      "The tool calculates the SHA-256 checksum in real-time.",
      "Copy the hash hex value."
    ],
    faqs: [
      {
        question: "Is SHA-256 reversible?",
        answer: "No. SHA-256 is a one-way cryptographic hash function, meaning you cannot reconstruct the input string from the hash value."
      }
    ]
  },
  "/security/md5": {
    path: "/security/md5",
    name: "MD5 Hash Generator",
    title: "MD5 Hash Generator Online - Checksum Calculator | AllToolDeck",
    description: "Generate MD5 hashes for text strings instantly. Clean, secure, and operates entirely locally.",
    category: "Security",
    howToUse: [
      "Type your input string.",
      "MD5 checksum generates instantly.",
      "Copy the output hash."
    ],
    faqs: [
      {
        question: "Should I use MD5 for password hashing?",
        answer: "No. MD5 is cryptographically broken and vulnerable to collisions. Use SHA-256 or bcrypt for password hashing."
      }
    ]
  },
  "/security/url": {
    path: "/security/url",
    name: "URL Encoder/Decoder",
    title: "URL Encoder and Decoder Online - URL Sanitizer | AllToolDeck",
    description: "Format or sanitize text strings for safe URL queries. Runs locally with zero tracking.",
    category: "Security",
    howToUse: [
      "Paste your string.",
      "Click 'Encode' to escape special characters, or 'Decode' to reverse it.",
      "Copy your formatted URL query."
    ],
    faqs: [
      {
        question: "What character encoding is used?",
        answer: "We use standard UTF-8 URL encoding compatible with all web APIs and server frameworks."
      }
    ]
  },
  "/security/jwt": {
    path: "/security/jwt",
    name: "JWT Decoder",
    title: "JWT Decoder Online - Decode JSON Web Tokens | AllToolDeck",
    description: "Inspect JSON Web Tokens (JWT) headers, payloads, and signatures locally. Safe JWT parsing.",
    category: "Security",
    howToUse: [
      "Paste your encoded JWT string.",
      "The tool decodes and formats header and claim payload JSON blocks.",
      "Review token scopes and expiration time."
    ],
    faqs: [
      {
        question: "Is parsing my token safe?",
        answer: "Yes. All token formatting and JSON parsing is executed locally. Your sensitive credentials are never transmitted."
      }
    ]
  },
  "/security/qr-generator": {
    path: "/security/qr-generator",
    name: "QR Code Generator",
    title: "QR Code Generator Online - Free Custom QR Maker | AllToolDeck",
    description: "Create downloadable QR codes for URLs, text, or phone numbers. Adjust sizes and download as PNG locally.",
    category: "Security",
    howToUse: [
      "Type the target URL or text.",
      "Choose QR code dimensions.",
      "Click generate to preview.",
      "Download the QR code image."
    ],
    faqs: [
      {
        question: "Do these QR codes expire?",
        answer: "No. These are static QR codes that contain your text directly. They will work indefinitely."
      }
    ]
  },
  "/security/qr-scanner": {
    path: "/security/qr-scanner",
    name: "QR Code Scanner",
    title: "QR Code Scanner Online - Read QR Code Images | AllToolDeck",
    description: "Extract data and URLs from QR Code images instantly. Privacy-focused client-side scanning.",
    category: "Security",
    howToUse: [
      "Upload or drop a QR code image file.",
      "The tool parses the pixel data using local jsQR scripts.",
      "Copy the extracted content."
    ],
    faqs: [
      {
        question: "Can it scan blurred QR codes?",
        answer: "It requires standard QR patterns to be legible. High contrast and clear resolution improve scanning accuracy."
      }
    ]
  }
};
