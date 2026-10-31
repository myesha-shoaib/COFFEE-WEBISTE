# Morrow Coffee House

A responsive multi-page coffee house website built with React, Vite, React Router, and Framer Motion. It includes a video-led home page, searchable and filterable coffee shop, product detail pages, an interactive coffee guide, an editorial journal, a story page, and a cafe visit/contact page.

## Pages

- `/` — Home and featured coffee
- `/shop` — Coffee collection with category filters, search, and sorting
- `/shop/:productId` — Product details and interactive shopping bag
- `/cart` — Shopping bag with quantity controls and order inquiry
- `/story` — Morrow's story and values
- `/coffee-guide` — Bean-to-cup context, roast profiles, and adjustable brew recipes
- `/journal` and `/journal/:slug` — Journal articles and brew guides
- `/gallery` — A responsive photo diary with all 100 local images and a full-screen viewer
- `/visit` — Cafe details, FAQs, directions, and contact form

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Local media

Website media is stored in `public/images/`: 100 locally downloaded coffee and cafe photos, additional section photos, and the autoplay hero video.
