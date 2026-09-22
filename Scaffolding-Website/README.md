# Scaffolding website

A responsive static website concept using charcoal, safety yellow and architectural grids. Open dist/index.html directly, or run `node preview.mjs` and visit http://localhost:4173.

## Replace before public launch

- Replace “Your Company” and logo placeholders with the approved company identity.
- Add project photography to the three image slots in dist/index.html. Keep the existing containers and use images with descriptive alt text, width:100%, height:100%, object-fit:cover. Remove the placeholder labels and centre content.
- Replace sample project headings with genuine project titles and details.
- Confirm the services and approach copy with the company.
- Add verified phone, email, service area and company registration details. Contact details are deliberately placeholders; no enquiries are collected or sent.
- Set the page title and description to the real company details. Replace the concept favicon if desired.

Files: dist/index.html (content), dist/styles.css (base design), dist/interactions.css (interactive styling), dist/script.js (interaction behaviour). Fonts are loaded from Google Fonts, with local fallbacks. No framework or installation required.

## Interactive experience

The hero lets visitors switch between residential, commercial and specialist showcases. It also responds subtly to pointer movement. Services update a visual panel, the project gallery supports touch scrolling and previous/next controls, and sections reveal as visitors scroll. A sticky navigation bar shows reading progress and the current section. The closing headline fills as it enters view.

Visitors can pause motion. Operating-system reduced-motion preferences are respected, and all controls work with a keyboard. No autoplay video or company photography is assumed. Hero copy for each service is in the scenes array in dist/script.js; add the corresponding real imagery when supplied.
