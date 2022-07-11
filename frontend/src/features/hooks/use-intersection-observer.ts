import { useEffect, useRef, useState } from 'react'
import { log } from 'console'

function useIntersectionObserver() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const updateEntry = (entries): void => {
    const [entry] = entries
    console.log(entry.isIntersecting, 'test')
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const node = containerRef?.current // DOM Ref

    const observerParams = { threshold: 0, root: null, rootMargin: '0%' }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    if (node) {
      observer.observe(node)
    }

    console.log('mount')

    return () => {
      console.log('unmount')

      if (node) {
        observer.unobserve(node)
      }
    }
  }, [containerRef])

  return { containerRef, isVisible }
}

// eslint-disable-next-line import/no-default-export
export default useIntersectionObserver
