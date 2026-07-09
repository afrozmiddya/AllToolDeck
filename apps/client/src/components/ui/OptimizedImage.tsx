import React from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt = "AllToolDeck utility illustration",
  width,
  height,
  loading = "lazy",
  decoding = "async",
  className,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt || "AllToolDeck utility illustration"}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      className={className}
      {...props}
    />
  );
};
export default OptimizedImage;
