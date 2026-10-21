import { useInView } from "react-intersection-observer";

/**
 * Wrapper around useInView that starts "true". A section that gates its
 * own content behind `opacity: 0` while waiting for `inView` can get stuck
 * invisible forever if the observer's first callback never fires before
 * paint (seen in production on this app: the hero and other sections
 * rendered with opacity 0 until the user scrolled). Sections should render
 * visible by default and only use `inView` for a one-time, non-essential
 * entrance flourish.
 */
export function usePixelReveal(options = {}) {
  return useInView({ threshold: 0.1, triggerOnce: true, initialInView: true, ...options });
}
