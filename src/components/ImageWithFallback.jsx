import { useState } from 'react';

export default function ImageWithFallback({ src, alt, ...rest }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc('/images/placeholder.jpg')}
      {...rest}
    />
  );
}
