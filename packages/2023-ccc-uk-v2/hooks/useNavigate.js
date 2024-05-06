import { useEffect, useRef, useCallback, useState } from 'react'
import ReactGA from 'react-ga'

import useWindowDimensions from './useWindowDimensions'

export default function useNavigate(pagesRef) {
  const [browsingIndex, setBrowsingIndex] = useState(0)
  const lowestPageIndexRef = useRef(0)
  const pageNavigationInfosRef = useRef([])
  const windowDimensions = useWindowDimensions()

  const jumpToPage = useCallback(
    (index) => {
      const scrollYPosition = pageNavigationInfosRef.current
        .slice(0, index)
        .reduce((sum, next) => sum + next.height, 0)
      pagesRef.current.parentElement.scroll(0, scrollYPosition)
    },
    [pagesRef]
  )

  useEffect(() => {
    setTimeout(() => {
      if (pagesRef.current) {
        const pageDoms = [
          ...pagesRef.current.querySelectorAll(':scope > div.page'),
        ]
        pageNavigationInfosRef.current = pageDoms.map((pageDom, index) => ({
          index,
          height: pageDom.clientHeight,
        }))
      }
    }, 300)
  }, [pagesRef, windowDimensions])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries = entries.filter((entry) => entry.isIntersecting)
        if (entries.length === 1) {
          const showingPageIndex = entries[0].target.id.split('-')[1] - 0

          if (showingPageIndex > lowestPageIndexRef.current) {
            lowestPageIndexRef.current = showingPageIndex
            if (
              showingPageIndex ===
              pagesRef.current.querySelectorAll(':scope > div.page').length - 1
            ) {
              ReactGA.event({
                category: 'Projects',
                action: 'scroll',
                label: `Scroll to end`,
              })
            }
          }

          setBrowsingIndex(showingPageIndex)
        } else if (entries.length > 1) {
          console.error(
            '[Error]: intersection observer observe two intersecting'
          )
        }
      },
      { threshold: 0.5 }
    )

    const pageDoms = [...pagesRef.current.querySelectorAll(':scope > div.page')]
    pageDoms.forEach((pageDom) => {
      observer.observe(pageDom)
    })

    return () => {
      pageDoms.forEach((pageDom) => {
        observer.unobserve(pageDom)
      })
    }
  }, [pagesRef])

  useEffect(() => {
    const beforeunloadHandler = () => {
      ReactGA.event({
        category: 'Projects',
        action: 'scroll',
        label: `Scroll to page ${lowestPageIndexRef.current}`,
      })
    }
    window.addEventListener('beforeunload', beforeunloadHandler)

    return () => window.removeEventListener('beforeunload', beforeunloadHandler)
  }, [])

  return {
    navigateTo: jumpToPage,
    browsingIndex,
  }
}
