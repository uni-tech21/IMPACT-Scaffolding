# Scaffolding website

## Open the website

Double-click index.html in the main folder. Or run npm run dev and open the Local address it prints. No installation is required.

## Folder guide

Scaffolding/
  index.html                 Shortcut to open the website
  package.json               Local startup commands
  preview.mjs                Local preview server
  public/                    Website files; publish this folder
    index.html               Page text and sections
    assets/
      images/
        logos/               Company logo files
        hero/                Main showcase photos (residential, commercial, specialist)
        projects/            Photos for the project gallery
      css/
        styles.css           Colours, typography and layout
        interactions.css     Animation and interactive styling
      js/
        site-config.js       Set image filenames and descriptions here
        script.js            Navigation, gallery and animation
        images.js            Loads supplied images, keeps placeholders if unavailable

## Add the company images

1. Copy the logo into public/assets/images/logos/. SVG or transparent PNG works well.
2. Put main showcase photos in public/assets/images/hero/ and gallery photos in public/assets/images/projects/.
3. Open public/assets/js/site-config.js. Enter each image path in its empty src field, following the examples there. Paths start with assets/, not public/.
4. Replace the alt descriptions with a short, accurate description of each image. Refresh the website.

Example: { src: 'assets/images/hero/residential.webp', alt: 'Scaffolding around a two-storey home' }

Empty paths keep the existing placeholders. Adding a file alone does not activate it: set its path in site-config.js. Use lowercase filenames with hyphens. Prefer landscape photos at least 1600 pixels wide for the hero and 1200 pixels for projects; optimised WebP or JPEG is ideal. Avoid putting private documents inside public/.

## Replace the previous folder layout

This version replaces the old dist layout. Close any old preview, then extract these files into the Scaffolding folder and replace matching files. The old dist directory is no longer used; after checking the new version, you can remove it. Keep .git and .gitattributes. Do not put this folder inside another Scaffolding-Website folder.

Company name, contact details, service claims and project descriptions still need your approved content before public launch.
