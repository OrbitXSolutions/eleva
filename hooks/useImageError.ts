"use client";

import { useState, useCallback, useEffect } from "react";
import {
  logImageError,
  getNextFallback,
  isValidImageUrl,
  preloadImageWithError,
  DEFAULT_FALLBACKS,
  type ImageFallbackConfig,
  type ImageErrorState,
} from "@/lib/common/image-error-handler";

interface UseImageErrorOptions {
  fallbackType?: keyof typeof DEFAULT_FALLBACKS;
  fallbackConfig?: ImageFallbackConfig;
  preload?: boolean;
  context?: string;
  onError?: (error: string, src: string) => void;
  onLoad?: (src: string) => void;
}

export function useImageError(
  initialSrc: string | null | undefined,
  options: UseImageErrorOptions = {}
) {
  const {
    fallbackType = "product",
    fallbackConfig,
    preload = false,
    context,
    onError,
    onLoad,
  } = options;

  const config = fallbackConfig || DEFAULT_FALLBACKS[fallbackType];

  const [state, setState] = useState<ImageErrorState>({
    hasError: false,
    retryCount: 0,
  });

  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize source
  useEffect(() => {
    if (!initialSrc || !isValidImageUrl(initialSrc)) {
      setCurrentSrc(config.final);
      setState({ hasError: true, retryCount: 0 });
      return;
    }

    setCurrentSrc(initialSrc);
    setState({ hasError: false, retryCount: 0 });

    // Preload if requested
    if (preload) {
      setIsLoading(true);
      preloadImageWithError(initialSrc).then(({ success, error }) => {
        setIsLoading(false);
        if (!success && error) {
          handleError(error);
        } else {
          onLoad?.(initialSrc);
        }
      });
    }
  }, [initialSrc, config.final, preload, onLoad]);

  const handleError = useCallback(
    (error: string) => {
      logImageError(currentSrc, error, context);

      const nextSrc = getNextFallback(currentSrc, config, state.retryCount);

      if (nextSrc && nextSrc !== currentSrc) {
        setCurrentSrc(nextSrc);
        setState((prev) => ({
          ...prev,
          retryCount: prev.retryCount + 1,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          hasError: true,
        }));
      }

      onError?.(error, currentSrc);
    },
    [currentSrc, config, state.retryCount, context, onError]
  );

  const retry = useCallback(() => {
    if (initialSrc && isValidImageUrl(initialSrc)) {
      setCurrentSrc(initialSrc);
      setState({ hasError: false, retryCount: 0 });
      setIsLoading(false);
    }
  }, [initialSrc]);

  const reset = useCallback(() => {
    setCurrentSrc(config.final);
    setState({ hasError: false, retryCount: 0 });
    setIsLoading(false);
  }, [config.final]);

  return {
    src: currentSrc,
    isLoading,
    hasError: state.hasError,
    retryCount: state.retryCount,
    canRetry: state.retryCount < (config.maxRetries || 2),
    handleError,
    retry,
    reset,
  };
}
