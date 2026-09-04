---
name: Luminous Commerce
colors:
  surface: '#f9f9ff'
  surface-dim: '#d5dae7'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e9eefb'
  surface-container-high: '#e4e8f5'
  surface-container-highest: '#dee2ef'
  on-surface: '#171c25'
  on-surface-variant: '#5b4042'
  inverse-surface: '#2b313a'
  inverse-on-surface: '#ecf1fd'
  outline: '#8f6f72'
  outline-variant: '#e3bdc0'
  surface-tint: '#bd0043'
  primary: '#b90041'
  on-primary: '#ffffff'
  primary-container: '#df2457'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2ba'
  secondary: '#5a5d73'
  on-secondary: '#ffffff'
  secondary-container: '#dbdef8'
  on-secondary-container: '#5e6177'
  tertiary: '#6134e6'
  on-tertiary: '#ffffff'
  tertiary-container: '#7a53ff'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dc'
  primary-fixed-dim: '#ffb2ba'
  on-primary-fixed: '#400011'
  on-primary-fixed-variant: '#910031'
  secondary-fixed: '#dee1fa'
  secondary-fixed-dim: '#c2c5de'
  on-secondary-fixed: '#161b2d'
  on-secondary-fixed-variant: '#42465a'
  tertiary-fixed: '#e7deff'
  tertiary-fixed-dim: '#cbbeff'
  on-tertiary-fixed: '#1d0061'
  on-tertiary-fixed-variant: '#4b07d1'
  background: '#f9f9ff'
  on-background: '#171c25'
  surface-variant: '#dee2ef'
  success-green: '#03A685'
  bg-off-white: '#F5F5F6'
  mrp-strikethrough: '#94969F'
  ai-gradient-start: '#7952FF'
  ai-gradient-end: '#FF3F6C'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  price-main:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1'
  price-mrp:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-margin-desktop: 40px
  grid-margin-mobile: 16px
  gutter: 16px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for a high-velocity, fashion-forward e-commerce environment. The brand personality is vibrant, trend-conscious, and editorial, blending the accessibility of a mass-market retailer with the premium feel of a digital fashion magazine. 

The aesthetic follows a **Modern Corporate** style with **Glassmorphism** and **AI-driven accents**. It prioritizes a clean, white-space-heavy interface to allow product photography to lead the experience. To differentiate the product, we introduce "Luminous Layers"—subtle gradients and blurred surfaces specifically for AI-powered features, creating a clear visual distinction between standard catalog browsing and personalized discovery.

**Key Visual Principles:**
- **Product First:** UI elements remain secondary to high-quality 3:4 imagery.
- **Vibrancy:** High-saturation primary pink serves as the "heartbeat" of the interface.
- **Intelligence:** Soft purple-to-pink gradients signify AI-enhanced sections, lending a premium, futuristic quality without feeling "tech-heavy."

## Colors

The color palette is centered on the iconic Primary Pink, used strategically for calls to action and brand identification. 

- **Primary:** Used for the most critical actions and brand-led moments.
- **Secondary:** Deep charcoal for high-contrast typography and iconography.
- **Neutral:** A tiered system of greys for metadata, secondary labels, and UI borders.
- **AI Accents:** A dual-tone gradient (`#7952FF` to `#FF3F6C`) is reserved strictly for AI Match badges, spark icons, and personalized curation backgrounds.
- **Success:** A clean, high-saturation green for conversion-critical paths like "Added to Bag" or "Payment Successful."

## Typography

This design system utilizes **Hanken Grotesk** for its sharp, contemporary geometry which echoes the precision of fashion tailoring. 

**Usage Guidelines:**
- **Brand Names:** Always use `label-bold` or `title-md` in Secondary Charcoal to ensure prominence in product listings.
- **Pricing:** The `price-main` token is paired immediately with `price-mrp` and a Pink-colored discount percentage.
- **Hierarchy:** Use tight letter spacing for large display headings to maintain a modern, editorial look.
- **Mobile Scaling:** Headings scale down on mobile to preserve screen real estate for product tiles.

## Layout & Spacing

The system uses a **Fluid Grid** for mobile and a **Fixed-Max-Width Grid** for desktop (1280px max) to ensure product cards maintain their optimal 3:4 aspect ratio.

- **Desktop:** 12-column grid, 16px gutters, 40px side margins. Elements reflow to 4 or 6 columns for product listings.
- **Mobile:** 2-column or 1-column grid, 16px gutters, 16px side margins. Product cards primarily use a 2-up layout to maximize density.
- **Vertical Rhythm:** A base 4px/8px modular scale is used for all internal component padding and element stacking.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Subtle Blurs** rather than heavy shadows.

- **Level 0 (Base):** White (`#FFFFFF`) or Off-White (`#F5F5F6`) for the main canvas.
- **Level 1 (Floating):** Navigation bars and sticky headers use a subtle 10% opacity shadow with a 20px blur to separate them from content without adding visual bulk.
- **AI Elevation:** Features related to "AI Match" use a 12px backdrop blur (Glassmorphism) with a 5% purple tint to create a "floating over the catalog" sensation.
- **Product Cards:** Low-contrast outlines (`#F5F5F6`) are preferred over shadows to maintain a clean, flat-design grid.

## Shapes

The shape language is **Soft** and systematic.

- **Standard Elements:** Buttons, input fields, and product cards utilize a `0.25rem` (4px) radius to maintain a professional, sharp fashion aesthetic.
- **Interactive Accents:** Search bars and "AI Match" badges use `rounded-xl` or pill-shaped profiles to suggest friendliness and high-tech fluidity.
- **Imagery:** Product photography remains sharp-cornered or uses a minimal 2px radius to preserve the integrity of the editorial content.

## Components

### Buttons
- **Primary:** Solid `#FF3F6C` background, white text, bold weight. Minimal roundedness.
- **AI Match Button:** Gradient background (`#7952FF` to `#FF3F6C`), white text, prefixed with a ✨ icon.

### Product Cards
- **Aspect Ratio:** Fixed 3:4.
- **Content Stack:** Brand Name (Bold) -> Short Description -> Pricing Row (Price, MRP, % Off).
- **Hover State:** Reveal "Add to Bag" button overlay or size selection.

### Search Bar
- **Styling:** Pill-shaped, light grey stroke, internal magnifying glass icon, and "AI Search" microphone icon in purple.

### Badges & Chips
- **Discount Badge:** Flat Orange or Pink tag in the top-left of cards.
- **AI Match Badge:** Small, pill-shaped gradient tag with white text, used for personalized recommendations.

### Input Fields
- **Styling:** Bottom-only border or full light-grey stroke, transitioning to Primary Pink on focus. Labels use `label-bold` for clarity.

### Header
- **Structure:** Logo left, Category Nav center, Search and Profile/Bag right. Persistent on scroll with a 1px `#F5F5F6` bottom border.