// Every source logo shares this canvas (verified against all 200 light+dark SVGs).
export default {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 100 60',
  fill: 'none',
};

// width / height ratio of the shared viewBox — matches the existing CSS plugin's
// `aspect-ratio: 1.66666` (tabler/core/scss/ui/_payments.scss), so JS components stay
// visually consistent with it.
export const ASPECT_RATIO = 1.66666;
