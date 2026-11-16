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
- About hover uses the user-supplied Iron Man image (`public/images/portrait-iron-3x.webp`). The supplied removebg-preview PNG is encoded losslessly with transparency. Hover and tap crossfade between the two portraits.

## Image provenance

Built-in image generation was used for background extraction. Final successful prompt: 'Background extraction ONLY. Remove background from this exact uncropped full portrait, preserve all original pixels of the person including exact face hair beard expression skin shirt trousers hands watch and pose. No retouching no reimagining no cropping. Same canvas aspect ratio and subject placement. Real transparent alpha, clean detailed edges, high quality.'

## Deployment

Pushes to main in `wazahahmad/wazahportfolio` deploy to the existing Vercel project and `https://wazahahmad.vercel.app/`.

The 3D scene is dynamically loaded, caps rendering resolution, pauses outside the viewport, and respects reduced motion. Other images use Next image optimization. No external fonts, Spotify embed, or comments backend is loaded.

## Reference matching update

The layout now uses local Inter, a compact desktop navigation pill, brighter star field, larger collage badge artwork, reference-style metallic panel borders, and outline interface icons. Sound controls and Web Audio logic were removed. The Tech Stack tab uses the same 15 entries and publicly served SVG logos displayed by the reference site. Brand logos retain their respective owners' marks; source metadata is retained in SVG files where supplied.
The badge now uses public/images/card-portrait.webp, encoded losslessly from the exact supplied exec-0090fd11-e439-40a8-98bf-4733a8274902.png cutout. The original image dimensions and alpha are preserved. Badge framing is applied only in the rendered canvas; the source asset is unchanged.

The ribbon now uses a 17-node constrained simulation. Its bottom node is pinned to the transformed top of the badge clip each frame; printed Wazah Ahmad lettering repeats along the fabric. Project borders use Paper LiquidMetal with the reference parameters; technology tiles use the reference conic edge sweep and pointer direction. Both effects respect reduced motion; shader rendering pauses offscreen.

At the user’s explicit request, the supplied transparent Iron Man cutout was enlarged 3× with Lanczos3 interpolation to 1128 × 1992 after the AI upscale service rejected the request. No generative detail was added. The PNG master is public/images/iron-man-3x.png; the site uses a lossless WebP version.
