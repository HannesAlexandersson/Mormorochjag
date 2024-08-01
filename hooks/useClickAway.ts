import { useEffect, useRef, MutableRefObject } from 'react'

interface Handler {
  (): void
}

const useClickAway = (handler: Handler): MutableRefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      if (ref.current && !ref.current.contains(ev.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handler])

  return ref
}

export default useClickAway
