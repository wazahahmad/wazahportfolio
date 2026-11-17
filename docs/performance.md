# Performance and sharing

- Vercel CDN caches public homepage and project responses for one hour, with background revalidation. It preserves Next.js response variants; no extra CDN or proxy is needed.
- Live verification after deployment: homepage repeated request changed from MISS to HIT (`x-vercel-cache`). Browser HTML remains revalidated; form submissions go directly to Formspree and are never included in page cache.
- Next.js hashed JS/CSS assets retain the framework’s automatic immutable caching. Fonts cache for one year, icons for a week, images for a day; use a new filename when replacing a cached asset.
- Next Image uses AVIF/WebP and caches transforms for at least a day. Below-fold screenshots remain lazy loaded. The page preloads the local Inter font.
- The 3D card is split into a separate client chunk and starts after the initial paint/idle opportunity. Its renderer pauses offscreen and in background tabs. Metallic shaders are lazy loaded, only mounted near the viewport, use a reduced pixel budget, and pause in hidden tabs. Reduced-motion users get static borders and backgrounds.
- Stars animate via compositor transforms and opacity. Six meteor tracks reuse tiny DOM elements. The preloader is a sub-second CSS transition, does not wait for Three.js or network calls, and hides with reduced motion.
- `/opengraph-image` is a statically generated 1200×630 PNG. Its centered portrait preserves the face under narrower social crops. Next.js adds its dimensions and versioned URL to Open Graph metadata.
- LinkedIn caches external previews independently. Use https://www.linkedin.com/post-inspector/ after image changes; refreshing that cache requires a LinkedIn sign-in. Previously sent cards may retain their older preview.
