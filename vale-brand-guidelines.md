# The Vale — Brand Guidelines for Claude Code

Upload this file at the start of every Claude Code session for this project.
These rules are non-negotiable. Do not deviate from them without explicit instruction.

---

## Who this site is for

The Vale is a modern event venue in Provo, Utah owned by Bobbi.
It sits at the base of the Wasatch mountains at 1078 South 250 East.
Primary markets: LDS wedding receptions, corporate events, private celebrations.
Key differentiator: a sleek modern building against a dramatic mountain backdrop — unusual in Utah County.
Pricing is published on the site. No quote requests, no runaround.

---

## Design tokens — source of truth

Always import and use `vale-design-system.json` for all color, spacing, and typography values.
Never hardcode a hex value, font size, or spacing value that exists in the token file.
If a token doesn't exist for something, ask before inventing a value.

**Primary color:** `#C9A06E` (gold-400)
**Page background:** `#F5F0E8` (cream — neutral-50)
**Primary dark:** `#1C1917` (ink — neutral-800)
**Rule/border:** `#D9D2C5`

---

## Typography rules — enforce strictly

### The one rule that matters most
**Playfair Display is for emotion and money only.**
**DM Sans is for everything else.**

If you are unsure which to use, use DM Sans.

### Playfair Display — use ONLY for:
- The logo / wordmark
- The hero headline (one per page)
- Section headings that are editorial and emotional (h2 level)
- Price values in the pricing table
- Pull quotes and testimonial text
- The closing CTA headline
- One italic word per card title — the emotional lever, never the whole title

### DM Sans — use for EVERYTHING else:
- Navigation links
- All button labels (no exceptions)
- Body copy
- Card titles (except the one italic Playfair accent word)
- Form labels and input text
- Amenity list items
- Pricing package names and time descriptions
- Badges, tags, status indicators
- Footer links
- Section eyebrow labels
- Admin interface (entirely DM Sans, no Playfair)

### Font weights
- DM Sans Light (300): body copy, card descriptions, form input text, captions
- DM Sans Regular (400): general UI text
- DM Sans Medium (500): card titles, package names, nav active state
- DM Sans SemiBold (600): button labels, eyebrow labels, form labels, badge text
- Playfair Display Regular (400): headlines, pull quotes
- Playfair Display Italic: the emotional lever — one word per headline, testimonials
- Playfair Display SemiBold (600): peak prices only

### Letter spacing
- Eyebrow labels: 0.30em, uppercase
- Nav links: 0.14em, uppercase
- Button labels: 0.13em, uppercase
- Badge text: 0.12em, uppercase
- Body copy: 0 (default)
- Playfair headlines: -0.02em (tight)

---

## Color rules

### Gold appears exactly 3 times on a full page
1. The primary CTA button (Book Now / Book the Space)
2. The price values in the pricing table
3. One accent moment — the italic Playfair word in a headline

Do not use gold for: dividers, background fills, decorative borders, multiple buttons on the same view.

### The palette
- Cream `#F5F0E8` — page background
- White `#FFFFFF` — card surfaces, form inputs
- Ink `#1C1917` — primary dark, nav on scroll, primary button background
- Gold `#C9A06E` — used sparingly as described above
- Muted `#7C7469` — body copy, descriptions
- Ghost `#A09890` — placeholder text, secondary labels
- Stone `#C8BFAF` — borders on light backgrounds

### Dark surfaces
Hero section, testimonial section, and footer use `#1C1917` (ink).
On dark surfaces: cream text `#F5F0E8`, gold accent `#D9B082` (gold-300).
Do not use white text on dark surfaces — use cream.

---

## Layout rules

### No equal-column grids
Three equal columns in a row looks like a template. Never use `grid-template-columns: repeat(3, 1fr)` for content sections.

Use instead:
- Hero: `grid-template-columns: 1fr 320px` — headline left, CTA right
- Section headers: `grid-template-columns: 1fr 480px` — serif headline left, body right
- Event cards: `grid-template-columns: 1.8fr 1fr` — large dominant left, two stacked right
- Pricing table: `1fr 70px 100px 100px 110px`
- Footer: `grid-template-columns: 1.5fr 1fr 1fr 1fr`

### Whitespace is a design tool
Generous section spacing signals quality. Use `96px` between major page sections.
Page horizontal padding: `48px` desktop, `20px` mobile.
Never cram content. If something feels tight, add space.

### No card boxes on editorial content
Pricing table: no card wrapper, just a clean table on the cream background.
Amenity list: no card wrapper, open list with gold dots.
Inquiry form: no card wrapper, fields directly on background.
Only use white card surfaces for: event type cards, featured pricing card, admin panels.

### Border radius
Buttons: `border-radius: 2px` — intentionally sharp, not rounded
Cards: `border-radius: 3px` — barely there
Admin panels: `border-radius: 4px`
Never use pill-shaped buttons on this site.

---

## Button system

### Hierarchy — only use one gold button per section
- Gold (`#C9A06E`): primary CTA — Book Now, Book the Space, Send Inquiry
- Ink (`#1C1917`): secondary action — Check Availability
- Outline (transparent + `#C8BFAF` border): tertiary — View Pricing, See Gallery
- Ghost (no background): inline link — Learn more, See packages

### Button behavior
- All labels: DM Sans SemiBold, uppercase, 0.13em letter-spacing
- Active/press: `transform: scale(0.97)`
- Gold hover: background darkens to `#B8892F`, text switches to cream
- Ink hover: background lightens to `#2E2B27`
- Ghost hover: text color goes from muted to ink
- Arrow on ghost buttons nudges right 3px on hover

### Sizes
- Small: `padding: 9px 18px`, font-size 9px
- Default: `padding: 14px 28px`, font-size 10px
- Large: `padding: 18px 40px`, font-size 11px

---

## Navigation

### Two states
1. Transparent: on hero section, white/cream logo and links, subtle border
2. Cream: on scroll, `background: #F5F0E8`, `border-bottom: 1px solid #D9D2C5`

### Logo treatment
- Wordmark: Playfair Display Italic, 21px, ink color on light / cream on dark
- Subtitle "at ten seventy-eight": DM Sans Light, 8.5px, 0.18em spacing, uppercase, ghost color
- Never use a png logo if an SVG is available

### Nav links
- DM Sans Medium, 10px, 0.14em letter-spacing, uppercase
- Active state: ink color + `border-bottom: 1px solid #C9A06E`
- Book Now CTA in nav: gold button, small size

---

## Page structure

### Home page sections in order
1. Nav (transparent)
2. Hero (dark surface, photography, headline + CTA)
3. Stats bar (100+ events, 5 star review, 100 capacity, $300 starting)
4. Section header + Event type cards
5. Testimonial (full width, dark surface)
6. Section header + Pricing table
7. Amenity list section
8. Closing CTA (centered, dark headline, gold button)
9. Footer (dark surface)

### Every page must have
- The transparent-to-cream nav scroll behavior
- The gold Book Now button always visible in the nav
- Footer on every page
- Mobile-first CSS — design for 375px, scale up

---

## Photography and imagery

### Placeholder images
Use Unsplash for placeholders. Query suggestions:
- Hero: `https://source.unsplash.com/1920x1080/?mountain,venue,modern`
- Gallery: `https://source.unsplash.com/800x600/?event,wedding,venue`
- Always use `object-fit: cover` and `object-position: center`

### Real image slots
Mark every placeholder with a comment: `{/* TODO: Replace with real venue photo */}`
Image components should accept a `src` prop so Bobbi can swap photos from the admin.

---

## Component patterns

### Section eyebrow
```jsx
<p className="eyebrow">Provo, Utah · Wasatch Mountains</p>
```
DM Sans SemiBold, 9px, 0.28em letter-spacing, uppercase, gold-dk color `#9A7128`

### Ornamental divider
A thin rule with a centered Playfair italic asterisk or dot. Used between major sections sparingly.

### Status flags
Left-border only (`border-left: 3px solid`), no full border.
Never use rounded corners on a single-sided border.

### Pricing table peak row
Full Day / Fri-Sat price: Playfair Display SemiBold, gold color, slightly larger than other prices.
Add a "Best value" badge next to the Full Day package name.

---

## Accessibility

- All text must meet WCAG AA minimum contrast
- Body text on cream: ink `#1C1917` — 15.4:1 (AAA)
- Muted text on cream: `#7C7469` — 4.1:1 (AA for large text, use 12px minimum)
- Caption text: 12px Regular minimum — never 11px Light for body content
- Gold button text: ink on gold — 7.3:1 (AAA)
- All images need descriptive alt text
- Form inputs need visible labels (not just placeholders)
- Focus rings: `box-shadow: 0 0 0 3px rgba(201,160,110,0.2)` on all interactive elements

---

## What not to do

- Do not use `box-shadow` for decoration — only for focus rings
- Do not use background gradients on content areas
- Do not use more than one gold CTA per screen view
- Do not use Playfair Display for button labels, nav links, or body copy
- Do not use pill-shaped (fully rounded) buttons
- Do not use three equal columns for content cards
- Do not use white text on dark surfaces — use cream `#F5F0E8`
- Do not add decorative icons, illustrations, or patterns
- Do not use more than two typefaces (Playfair + DM Sans only)
- Do not center-align body copy paragraphs
- Do not add hover animations that distract — only functional transitions

---

## Admin interface rules

The admin is a completely separate design language from the public site.
It is functional and neutral. Bobbi is a non-technical user — keep it simple.

- Font: DM Sans throughout, no Playfair
- Background: `#F8F8F8`
- Panel background: `#FFFFFF`
- Border: `1px solid #E0E0E0`
- Border radius: `4px` on all admin elements
- Primary action button: `background: #1A1A1A, color: #FFFFFF`
- Accent: gold only for active sidebar items and the "Live" badge
- Route: `/admin` — protected by Supabase Auth
- Bobbi's login: email + password via Supabase Auth

### Admin sections
- Content: edit hero copy, about copy, event type descriptions
- Gallery: upload photos, drag to reorder, set featured image, remove photos
- Pricing: edit package names, hours, prices per day type
- Availability: mark dates as booked/unavailable on a calendar
- Settings: change primary brand color (regenerates token scale), swap fonts, update contact info

---

## File structure

```
vale-venue/
  app/
    page.tsx              # Home
    pricing/page.tsx
    gallery/page.tsx
    contact/page.tsx
    admin/
      page.tsx            # Admin dashboard
      content/page.tsx
      gallery/page.tsx
      pricing/page.tsx
      availability/page.tsx
      settings/page.tsx
  components/
    layout/
      Nav.tsx
      Footer.tsx
    sections/
      Hero.tsx
      StatsBar.tsx
      EventCards.tsx
      PricingTable.tsx
      TestimonialSection.tsx
      AmenityList.tsx
      ClosingCTA.tsx
    ui/
      Button.tsx
      Badge.tsx
      Tag.tsx
      Input.tsx
      StatusFlag.tsx
      Divider.tsx
    admin/
      AdminNav.tsx
      AdminSidebar.tsx
      ContentPanel.tsx
      GalleryManager.tsx
      ColorPicker.tsx
      StatusBar.tsx
  lib/
    supabase.ts
    tokens.ts             # Imports vale-design-system.json
  public/
    vale-design-system.json
```

---

## Environment variables required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Never hardcode these values. Always read from `process.env`.
