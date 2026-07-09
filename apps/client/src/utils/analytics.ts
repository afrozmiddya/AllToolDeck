// Google Analytics 4 (GA4) Custom Event Logging Wrapper

export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  } else {
    // Fallback console logging in development mode
    if (import.meta.env.DEV) {
      console.log(`[Analytics-Dev] Event "${eventName}":`, eventParams);
    }
  }
};

// Track when a local tool finishes execution successfully
export const trackToolUsage = (toolName: string, actionType: string) => {
  trackEvent("tool_usage", {
    tool_name: toolName,
    action_type: actionType,
    processing_type: "client_side"
  });
};

// Track search input events and result frequencies
export const trackSearch = (searchQuery: string, resultsCount: number) => {
  trackEvent("search", {
    search_term: searchQuery,
    results_count: resultsCount
  });
};

// Track clicks on primary action elements (copy/download/share)
export const trackActionClick = (actionName: "copy" | "download" | "share", targetTool: string) => {
  trackEvent("action_click", {
    action_name: actionName,
    target_tool: targetTool
  });
};

// Track ad view and conversion parameters
export const trackAdImpression = (adSlot: string) => {
  trackEvent("ad_impression", {
    ad_slot: adSlot
  });
};

export const trackAdClick = (adSlot: string) => {
  trackEvent("ad_click", {
    ad_slot: adSlot
  });
};
