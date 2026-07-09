import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: string;
  image?: string;
  schemas?: any[];
  robots?: string; // e.g. "index, follow" or "noindex, nofollow"
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  type = "website",
  image = "https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png",
  schemas = [],
  robots = "index, follow"
}) => {
  useEffect(() => {
    // 1. Audit Meta Tag Lengths (For SEO developer validation in console)
    if (title.length > 60) {
      console.warn(`SEO Warning: Title tag "${title}" is too long (${title.length} chars). Keep under 60 characters.`);
    }
    if (description.length > 160) {
      console.warn(`SEO Warning: Meta description is too long (${description.length} chars). Keep under 160 characters.`);
    } else if (description.length < 50) {
      console.warn(`SEO Warning: Meta description is too short (${description.length} chars). Aim for 50-160 characters.`);
    }

    // 2. Update Document Title
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
    const updateLinkTag = (rel: string, href: string, attributes?: Record<string, string>) => {
      let selector = `link[rel="${rel}"]`;
      if (attributes && attributes.hreflang) {
        selector += `[hreflang="${attributes.hreflang}"]`;
      }
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        if (attributes) {
          Object.entries(attributes).forEach(([k, v]) => element?.setAttribute(k, v));
        }
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 3. Update Primary Metadata
    updateMetaTag("name", "description", description);
    updateLinkTag("canonical", canonicalUrl);
    updateMetaTag("name", "robots", robots);
    updateMetaTag("name", "author", "AllToolDeck");
    updateMetaTag("name", "theme-color", "#7C3AED");

    // 4. Update Hreflang Tags (For Internationalization support)
    updateLinkTag("alternate", canonicalUrl, { hreflang: "en" });
    updateLinkTag("alternate", canonicalUrl, { hreflang: "x-default" });

    // 5. Open Graph Tags
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:url", canonicalUrl);
    updateMetaTag("property", "og:type", type);
    updateMetaTag("property", "og:image", image || "https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png");
    updateMetaTag("property", "og:site_name", "AllToolDeck");

    // 6. Twitter Card Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", image || "https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png");

    // 7. Inject JSON-LD Schema
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

    // Site Navigation elements schema for better internal routing representation
    const siteNavigationSchema = {
      "@type": "SiteNavigationElement",
      "name": ["Home", "PDF Tools", "Image Tools", "Text Tools", "Security Tools", "Blog"],
      "url": [
        "https://alltooldeck.netlify.app/",
        "https://alltooldeck.netlify.app/pdf",
        "https://alltooldeck.netlify.app/image",
        "https://alltooldeck.netlify.app/text",
        "https://alltooldeck.netlify.app/security",
        "https://alltooldeck.netlify.app/blog"
      ]
    };

    // Collection Page schema if category type is provided
    const collectionSchema = type === "collection" ? {
      "@type": "CollectionPage",
      "name": title,
      "description": description,
      "url": canonicalUrl
    } : null;

    const mergedSchemas = [...schemas, siteNavigationSchema];
    if (collectionSchema) {
      mergedSchemas.push(collectionSchema);
    }

    scriptTag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": mergedSchemas
    });

    // Cleanup
    return () => {
      document.title = originalTitle;
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, canonicalUrl, type, image, schemas, robots]);

  return null;
};
export default SEO;
