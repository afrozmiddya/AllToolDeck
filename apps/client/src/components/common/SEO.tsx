import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: string;
  image?: string;
  schemas?: any[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  type = "website",
  image = "https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png",
  schemas = []
}) => {
  useEffect(() => {
    // 1. Update Title
    const originalTitle = document.title;
    document.title = title;

    // Helper to upsert meta tags
    const updateMetaTag = (attr: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to upsert link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Update Primary Metadata
    updateMetaTag("name", "description", description);
    updateLinkTag("canonical", canonicalUrl);
    updateMetaTag("name", "robots", "index, follow");
    updateMetaTag("name", "author", "AllToolDeck");
    updateMetaTag("name", "theme-color", "#7C3AED");

    // 3. Open Graph Tags
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:url", canonicalUrl);
    updateMetaTag("property", "og:type", type);
    updateMetaTag("property", "og:image", image);
    updateMetaTag("property", "og:site_name", "AllToolDeck");

    // 4. Twitter Card Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", image);

    // 5. Inject JSON-LD Schema
    const scriptId = "dynamic-json-ld-schema";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (scriptTag) {
      scriptTag.textContent = "";
    } else {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    if (schemas && schemas.length > 0) {
      scriptTag.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": schemas
      });
    }

    // Cleanup function
    return () => {
      document.title = originalTitle;
      
      // We keep standard description/canonical but they will be overwritten by next mount.
      // Remove JSON-LD Script on unmount to prevent page script pollution
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, canonicalUrl, type, image, schemas]);

  return null; // Side-effect only component
};
export default SEO;
