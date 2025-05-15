export function scrollToTop(duration: number = 500) {
  const startPosition = window.scrollY
  const startTime = performance.now()

  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  const animate = (currentTime: number) => {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    window.scrollTo({
      top: startPosition * (1 - easeInOutQuad(progress)),
      behavior: 'auto',
    })

    if (timeElapsed < duration) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}
