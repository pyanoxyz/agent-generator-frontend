import { useRef, useEffect, useCallback, useState } from "react";

const useAutoScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const lastScrollHeight = useRef(0);

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
          scrollToBottom();
        }
      });

      observer.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = element;
        const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
        // const isAtBottom = Math.abs(scrollTop) < 1;
        setShowScrollToBottom(!isAtBottom);
        setIsAutoScrolling(isAtBottom);

        if (scrollHeight > lastScrollHeight.current) {
          lastScrollHeight.current = scrollHeight;
          if (isAtBottom) {
            scrollToBottom();
          }
        }
      };

      element.addEventListener("scroll", handleScroll);
      scrollToBottom();

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
    scrollToBottom();
    setIsAutoScrolling(true);
  }, [scrollToBottom]);

  return { scrollRef, manualScrollToBottom, showScrollToBottom };
};

export default useAutoScroll;
