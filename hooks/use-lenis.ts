"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Add scroll-to functionality to buttons
    const scrollButtons = document.querySelectorAll("[data-lenis-scroll]")
    scrollButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const target = button.getAttribute("data-lenis-scroll")
        if (target) {
          lenis.scrollTo(target, {
            offset: -80,
            duration: 1.5,
          })
        }
      })
    })

    return () => {
      lenis.destroy()
    }
  }, [])
}
