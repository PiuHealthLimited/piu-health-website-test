import { useEffect, useState } from 'react';
import { loadingIndicatorImage } from '@/assets/images';

export function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(false);
    }, 800);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div id="loading">
      <div id="loading-center">
        <img src={loadingIndicatorImage} alt="PiuHealth loading indicator" />
      </div>
    </div>
  );
}
