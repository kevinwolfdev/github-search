export const ANIMATION_DURATION = 0.25
export const SLIDE_SIZE = 50

export const appearAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: ANIMATION_DURATION },
}

export const slideDownAnimation = {
  ...appearAnimation,
  initial: { ...appearAnimation.initial, y: -SLIDE_SIZE },
  animate: { ...appearAnimation.animate, y: 0 },
  exit: { ...appearAnimation.exit, y: -SLIDE_SIZE },
}

export const slideUpAnimation = {
  ...appearAnimation,
  initial: { ...appearAnimation.initial, y: SLIDE_SIZE },
  animate: { ...appearAnimation.animate, y: 0 },
  exit: { ...appearAnimation.exit, y: SLIDE_SIZE },
}

export const slideRightAnimation = {
  ...appearAnimation,
  initial: { ...appearAnimation.initial, x: -SLIDE_SIZE },
  animate: { ...appearAnimation.animate, x: 0 },
  exit: { ...appearAnimation.exit, x: -SLIDE_SIZE },
}
