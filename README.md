# Arixentra Technologies — Business Website

A premium, responsive, single-page website for **Arixentra Technologies**, a Namibia-based IT consultancy specialising in software engineering, computer networks and cybersecurity.

## Quick start

There are **no dependencies or build tools**. Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Included

- Brand-aligned dark navy, yellow, white and slate-gray visual system
- Approved Arixentra symbol, favicon, and social-sharing image
- Accessible responsive navigation and meaningful reduced-motion preferences
- Lightweight interactive **3D-projected network sphere** built with Canvas (no Three.js dependency)
- Sections for services, about, working approach, values, and contact
- Working WhatsApp and `mailto:` calls to action
- Contact form that **opens the user's email app**; no backend, storage or tracking
- Semantic HTML, Open Graph metadata and JSON-LD structured data

## Business contacts

- Email: `arixentra@gmail.com`
- WhatsApp: `+264 85 701 1655` (`https://wa.me/264857011655`)
- Display address: `3637 Fouche Street, Windhoek West, Windhoek, Namibia`
- Facebook, Instagram, and X are shown as **coming soon** until real company profile URLs are provided.

## Prior to production launch

1. Confirm BIPA business-name registration and brand/trademark availability.
2. Confirm spelling and map pin for the office address; user-provided spelling was “Fouche Steet”, normalised to “Fouche Street” for display.
3. Replace social placeholders only with verified Arixentra profile links (do not link generic platform homepages).
4. Replace the `mailto:` form with a secure form backend if you require in-page submission. Add consent, anti-spam protections, rate limits and an appropriate privacy statement before collecting data on a server.
5. Configure the production domain, add a canonical URL and absolute `og:image`, and register the domain with search engines.
6. Test the site on actual mobile devices and deploy to HTTPS hosting.
7. For production logos, commission or create clean SVG masters based on the approved PNG identity; the included cropped images are visual prototypes, not vector originals.

## Deployment

### GitHub Pages

Create a new repository named `arixentra-technologies` under your GitHub account. Copy all files from this project to the repository root and commit them to `main`. Under **Settings → Pages**, choose **Deploy from a branch**, `main`, `/(root)` (or use GitHub Pages' workflow options). Since assets use relative URLs, this site also works at a project subpath.

### Netlify / Cloudflare Pages

Publish the repository root as a static site (no build command needed).

## Design tokens

| Name | Hex | Use |
|---|---|---|
| Deep navy | `#0F172A` | Main brand color, text and dark surfaces |
| Yellow | `#FACC15` | Buttons, icons and intentional emphasis |
| White | `#FFFFFF` | Background and text on dark surfaces |
| Slate gray | `#475569` | Supporting copy and neutral elements |

Typography: **Manrope** for headings / brand, **Inter** for readable body text. Web fonts load from Google Fonts with system fallbacks.

## Project layout

```text
arixentra-website/
├── index.html
├── styles.css
├── main.js
├── assets/
│   ├── arixentra-mark.png
│   ├── arixentra-mark.webp
│   ├── arixentra-full-logo.png
│   ├── favicon.png
│   ├── favicon-48.png
│   └── og-arixentra.jpg
├── docs/
│   └── BRANDING.md
└── README.md
```

© 2026 Arixentra Technologies. Logo and branding are provisional until business name and trademark checks are complete.

### One-command GitHub repository creation (using GitHub CLI)

Once `gh` is installed and authenticated using `gh auth login`, run from the extracted website folder:

```bash
./publish-to-github.sh --public
```

Omit `--public` to create a **private** repository. This helper never overwrites an existing repository. The GitHub connector available in this chat does not expose new-repository creation; the script completes that step through your own authenticated GitHub CLI.
