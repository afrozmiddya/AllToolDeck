import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface PrefetchLinkProps extends LinkProps {
  preloadFn?: () => Promise<any>;
}

export const PrefetchLink: React.FC<PrefetchLinkProps> = ({
  preloadFn,
  onMouseEnter,
  onFocus,
  children,
  ...props
}) => {
  const handlePrefetch = () => {
    if (preloadFn) {
      // Trigger dynamic chunk fetch (fire and forget, browser will cache)
      preloadFn().catch(() => {});
    }
  };

  return (
    <Link
      onMouseEnter={(e) => {
        handlePrefetch();
        if (onMouseEnter) onMouseEnter(e);
      }}
      onFocus={(e) => {
        handlePrefetch();
        if (onFocus) onFocus(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
export default PrefetchLink;
