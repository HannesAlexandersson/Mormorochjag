import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState({})

  useEffect(() => {
    const handleSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleSize()

    window.addEventListener('resize', handleSize)

    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  return size
}

export default useWindowSize