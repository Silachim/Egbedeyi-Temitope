import { useEffect } from 'react'

const MIN_TOUCH_TARGET = 44
const OVERFLOW_TOLERANCE = 2

function isVisible(element) {
  if (!(element instanceof HTMLElement)) return false

  const style = window.getComputedStyle(element)

  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    element.getClientRects().length > 0
  )
}

function hasOverflowingAncestor(element, offenderSet) {
  let parent = element.parentElement

  while (parent) {
    if (offenderSet.has(parent)) return true
    parent = parent.parentElement
  }

  return false
}

function findRootOverflowOffenders() {
  const allOffenders = []
  const offenderSet = new Set()

  document.querySelectorAll('body *').forEach((element) => {
    if (!isVisible(element)) return

    const rect = element.getBoundingClientRect()

    const overflows =
      rect.right > window.innerWidth + OVERFLOW_TOLERANCE ||
      rect.left < -OVERFLOW_TOLERANCE

    if (overflows) {
      allOffenders.push(element)
      offenderSet.add(element)
    }
  })

  return allOffenders.filter(
    (element) => !hasOverflowingAncestor(element, offenderSet)
  )
}

function findSmallTouchTargets() {
  const selector = [
    'a[href]',
    'button',
    'input:not([type="hidden"])',
    'select',
    'textarea',
    '[role="button"]',
    '[role="link"]',
  ].join(',')

  return Array.from(document.querySelectorAll(selector))
    .filter(isVisible)
    .filter((element) => {
      const rect = element.getBoundingClientRect()

      return (
        rect.width < MIN_TOUCH_TARGET ||
        rect.height < MIN_TOUCH_TARGET
      )
    })
}

function findImagesMissingAlt() {
  return Array.from(document.querySelectorAll('img'))
    .filter((image) => !image.hasAttribute('alt'))
}

function runAudit() {
  if (!import.meta.env.DEV) return

  const overflow = findRootOverflowOffenders()
  const smallTargets = findSmallTouchTargets()
  const missingAlt = findImagesMissingAlt()

  if (overflow.length) {
    console.groupCollapsed(
      `[4F.3 QA] ${overflow.length} root horizontal overflow candidate(s)`
    )
    overflow.forEach((element) => console.warn(element))
    console.groupEnd()
  }

  if (smallTargets.length) {
    console.info(
      `[4F.3 QA] ${smallTargets.length} interactive element(s) are smaller than ${MIN_TOUCH_TARGET}px in at least one dimension. This is advisory, not a runtime error.`
    )
  }

  if (missingAlt.length) {
    console.groupCollapsed(
      `[4F.3 QA] ${missingAlt.length} image(s) missing alt text`
    )
    missingAlt.forEach((element) => console.warn(element))
    console.groupEnd()
  }

  if (
    !overflow.length &&
    !smallTargets.length &&
    !missingAlt.length
  ) {
    console.info(
      '[4F.3 QA] No obvious cross-device regressions detected.'
    )
  }
}

export default function ResponsiveQA() {
  useEffect(() => {
    if (!import.meta.env.DEV) return undefined

    let frameId = 0
    let resizeTimer = 0

    const scheduleAudit = () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(resizeTimer)

      resizeTimer = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(runAudit)
      }, 180)
    }

    scheduleAudit()

    window.addEventListener('resize', scheduleAudit)
    window.addEventListener(
      'orientationchange',
      scheduleAudit
    )

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(resizeTimer)

      window.removeEventListener(
        'resize',
        scheduleAudit
      )
      window.removeEventListener(
        'orientationchange',
        scheduleAudit
      )
    }
  }, [])

  return null
}
