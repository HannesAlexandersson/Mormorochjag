'use client'

import { useEffect, useRef } from 'react'
import { isBrowser } from '@/lib/utils'

const useEventListener = <T extends Event>(
  event: keyof HTMLElementEventMap,
  callback: (ev: T) => void,
  element?: HTMLElement
) => {
  const listenerRef = useRef(callback);

  useEffect(() => {
    listenerRef.current = callback;
  }, [callback]);


  useEffect(() => {
    if (!isBrowser()) return;

    const eventListener = (ev: Event) => listenerRef.current(ev as T);

    const target = element ?? window;
    target.addEventListener(event, eventListener as EventListener);

    return () => target.removeEventListener(event, eventListener as EventListener);
  }, [element, event]);
};

export default useEventListener;