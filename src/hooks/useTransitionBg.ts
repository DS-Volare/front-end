import { useRef } from 'react';

// ref 위치로 scroll하는 use hook
export const useTransitionBg = (page: number) => {
  const element = useRef<HTMLDivElement>(null);
  const onTransitionBackground = () => {
    element.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return { element, page, onTransitionBackground };
};
