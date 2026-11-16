# Wazah Ahmad Portfolio

Next.js App Router portfolio with a custom Three.js draggable, spring animated, double sided card, LinkedIn QR, responsive navigation, portrait interactions, CV education and experience, project detail pages, and contact section.

## Development

Run `npm install`, then `npm run dev`. Production: `npm run build` and `npm run start`.

## Content

- Homepage content and CV entries: `components/portfolio-client.jsx`.
- Sample projects: `lib/projects.js`. All samples link to `/projects/[slug]`; replace text and images with final project data.
- Original uncropped portrait: `public/images/portrait-original.jpg`.
- Optimized transparent portrait: `public/images/portrait.webp` (generated cutout, WebP with alpha).
- Original supplied LinkedIn QR: `public/images/linkedin-qr.gif`.
- Contact form opens a mail composer; it does not silently send or store messages. A hosted form provider can be connected later.
- Iron Man image generation was rejected by the image service. The portrait currently uses a glow interaction; no armor asset is included.

## Image provenance

Built-in image generation was used for background extraction. Final successful prompt: 'Background extraction ONLY. Remove background from this exact uncropped full portrait, preserve all original pixels of the person including exact face hair beard expression skin shirt trousers hands watch and pose. No retouching no reimagining no cropping. Same canvas aspect ratio and subject placement. Real transparent alpha, clean detailed edges, high quality.'

## Deployment

Pushes to main in `wazahahmad/wazahportfolio` deploy to the existing Vercel project and `https://wazahahmad.vercel.app/`.

The 3D scene is dynamically loaded, caps rendering resolution, pauses outside the viewport, and respects reduced motion. Other images use Next image optimization. No external fonts, Spotify embed, or comments backend is loaded.

## Reference matching update

The layout now uses local Inter, a compact desktop navigation pill, brighter star field, larger collage badge artwork, reference-style metallic panel borders, and outline interface icons. Sound controls and Web Audio logic were removed. The Tech Stack tab uses the same 15 entries and publicly served SVG logos displayed by the reference site. Brand logos retain their respective owners' marks; source metadata is retained in SVG files where supplied.
