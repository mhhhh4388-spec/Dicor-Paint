export default {
  // URL of the live site used for the full-site preview.
  // Set it via the SANITY_STUDIO_PREVIEW_BASE_URL environment variable or edit it here.
  baseUrl: (process.env.SANITY_STUDIO_PREVIEW_BASE_URL || 'https://dicor-paint.vercel.app').replace(/\/+$/, ''),
}
