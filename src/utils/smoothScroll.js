/**
 * Cross-browser smooth scroll utility
 * Provides fallback for browsers that don't support smooth scrolling
 */

export const smoothScrollTo = (element, options = {}) => {
  if (!element) return;

  // Check if browser supports smooth scrolling
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

  if (supportsNativeSmoothScroll) {
    // Use native smooth scroll
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      ...options 
    });
  } else {
    // Fallback for browsers that don't support smooth scroll
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // milliseconds
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function for smooth animation
    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  }
};

export const smoothScrollToId = (id, options = {}) => {
  const element = document.getElementById(id);
  smoothScrollTo(element, options);
};
