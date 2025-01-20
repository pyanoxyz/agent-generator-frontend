import { useRef, useEffect, useCallback, useState } from "react";

const useAutoScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const lastScrollHeight = useRef(0);
  const scrollThreshold = 10;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      element.scrollTop = element.scrollHeight - element.clientHeight;
    }
  }, []);

  useEffect(() => {
    let currentRef = scrollRef.current;

    const setupListeners = (element: HTMLDivElement | null) => {
      if (!element) return () => {};

      const observer = new MutationObserver(() => {
        if (isAutoScrolling) {
          requestAnimationFrame(scrollToBottom);
        }
      });

      observer.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      const handleScroll = () => {
        if (!element) return;

        const { scrollTop, scrollHeight, clientHeight } = element;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        const isNearBottom = distanceFromBottom <= scrollThreshold;

        // Update auto-scroll state based on scroll position
        setIsAutoScrolling(isNearBottom);
        setShowScrollToBottom(!isNearBottom);

        // Handle new content
        if (scrollHeight > lastScrollHeight.current) {
          lastScrollHeight.current = scrollHeight;
          if (isNearBottom || isAutoScrolling) {
            requestAnimationFrame(scrollToBottom);
          }
        }
      };

      element.addEventListener("scroll", handleScroll);

      // Initial scroll to bottom
      requestAnimationFrame(scrollToBottom);

      return () => {
        observer.disconnect();
        element.removeEventListener("scroll", handleScroll);
      };
    };

    const cleanup = setupListeners(currentRef);

    return () => {
      cleanup();
      currentRef = null;
    };
  }, [isAutoScrolling, scrollToBottom]);

  const manualScrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollToBottom();
      setIsAutoScrolling(true);
    });
  }, [scrollToBottom]);

  return { scrollRef, manualScrollToBottom, showScrollToBottom };
};

export default useAutoScroll;
