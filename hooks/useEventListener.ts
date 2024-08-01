'use client'

import { useEffect, useRef } from 'react'
import { isBrowser } from '@/lib/utils'

interface UseEventListenerProps<K extends keyof WindowEventMap> {
  event: K
  callback: (event: WindowEventMap[K]) => void
  element?: HTMLElement | Window | null
}

const useEventListener = <K extends keyof WindowEventMap>({
  event,
  callback,
  element,
}: UseEventListenerProps<K>): void => {
  const listenerRef = useRef(callback)

  useEffect(() => {
    listenerRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!isBrowser()) return

    const eventListener = (ev: Event) => {
      // Type assertion to ensure the event matches the expected type
      listenerRef.current(ev as WindowEventMap[K])
    }

    const target = element ?? window
    target.addEventListener(event, eventListener)

    return () => {
      target.removeEventListener(event, eventListener)
    }
  }, [element, event])
}

export default useEventListener
