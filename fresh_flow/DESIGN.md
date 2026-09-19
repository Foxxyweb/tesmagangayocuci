---
name: Fresh Flow
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#5a4138'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#8e7166'
  outline-variant: '#e2bfb2'
  surface-tint: '#a73a00'
  primary: '#a33900'
  on-primary: '#ffffff'
  primary-container: '#cc4900'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb599'
  secondary: '#855316'
  on-secondary: '#ffffff'
  secondary-container: '#ffbc76'
  on-secondary-container: '#79490b'
  tertiary: '#00685f'
  on-tertiary: '#ffffff'
  tertiary-container: '#008378'
  on-tertiary-container: '#f4fffc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb599'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7f2b00'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#fcb973'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#683c00'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The brand personality embodies youthful energy, uncompromised efficiency, and approachable reliability tailored for laundry and dry-cleaning business owners. The UI evokes a sense of relief, clarity, and delight—transforming an operational chore into a frictionless, automated growth experience. 

The aesthetic is a synthesis of **Modern SaaS Clarity** and **Soft Glassmorphism / Tactile Lightness**. It relies on warm energetic citrus tones, generous breathing room, ultra-clean white canvas surfaces, luminous warm ambient background meshes, and floating pill-shaped containers. Depth is conveyed not through heavy boundaries, but through diffused, colored back-shadows and subtle semi-translucent glass floating navigation docks.

## Colors

The palette centers on warm, energetic optimism supported by reassuring corporate stability:

- **Primary (`#EA580C`)**: A vivid, warm laundry-citrus orange driving primary calls-to-action, active indicator tags, and core metric highlights.
- **Secondary (`#FDBA74`)**: A soft sunburst tint used for pill tag outlines, subtle gradient stops, and secondary hover backplates.
- **Tertiary (`#0D9488`)**: A crisp, fresh laundry-mint teal serving as a positive indicator (success, completed wash cycle, profit delta, coin balance).
- **Neutral (`#1E293B`)**: A deep slate for headlines and crisp typography, preventing the visual exhaustion of pure `#000000`.
- **Canvas / Surfaces**: Warm ambient tint `#FFFBF7` for the background canvas, crisp `#FFFFFF` for floating interaction cards, and `rgba(255, 255, 255, 0.85)` with backdrop-filter for floating headers.

## Typography

**Plus Jakarta Sans** provides a warm, geometric clarity with friendly open apertures that read effortlessly across small POS screens and high-resolution landing viewports. 

Headlines command visual hierarchy through tight tracking (`-0.02em` to `-0.03em`) and high contrast weights (`700` and `800`), while body copy prioritizes generous line-height ratios (`1.5` to `1.6`) to maintain effortless scanning on pricing breakdowns and feature matrices.

## Layout & Spacing

The layout adopts a centered 12-column responsive fluid grid with a maximum content container of `1240px`.

- **Desktop (>= 1024px)**: 12 columns, `1.5rem` (24px) gutters, `2rem` (32px) margins. Sections adopt generous top and bottom padding (`5rem` to `7rem`) to create open, unhurried negative space.
- **Tablet (768px - 1023px)**: 8 columns, `1.5rem` gutters, `1.5rem` margins. Multicolumn pricing cards collapse into a 2-column or stacked layout.
- **Mobile (< 768px)**: 4 columns, `1rem` gutters, `1.25rem` margins. Floating navigation shifts to a compact fixed glass pill, and horizontal multi-app phone previews shift into a touch-enabled horizontal swipe carousel.

## Elevation & Depth

Visual depth is achieved through an airy combination of luminous ambient tinted shadows and glassmorphism:

- **Floating Navigation Dock**: Uses `backdrop-filter: blur(16px)` with `background: rgba(255, 255, 255, 0.82)` and a soft ambient shadow (`0 8px 32px -4px rgba(234, 88, 12, 0.08)`), anchored by a low-opacity white stroke (`border: 1px solid rgba(255, 255, 255, 0.6)`).
- **Interactive Cards**: High-white `#FFFFFF` background with subtle multi-tiered shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 20px 25px -5px rgba(234, 88, 12, 0.04)`. On hover, the orange aura elevates smoothly to `0 25px 35px -5px rgba(234, 88, 12, 0.1)`.
- **App Mockup Containers**: Phone frames cast deep soft-drop contact shadows (`0 35px 60px -15px rgba(15, 23, 42, 0.12)`) to lift UI screens prominently off background gradients.
- **Micro Overlays**: Tooltips and floating badges leverage `0 10px 15px -3px rgba(0, 0, 0, 0.05)`.

## Shapes

The design system uses a pill-forward rounded language (`roundedness: 3`). 

Primary interactive controls (CTAs, floating nav bars, filter tags, pill badges) utilize full pill radii (`9999px`). Content cards, interactive pricing tiers, and presentation wrappers adopt `rounded-xl` (`1.5rem` / `24px` to `2rem` / `32px`) to evoke a modern, tactile, and friendly consumer-app aesthetic.

## Components

### Buttons
- **Primary Action**: Full pill radius (`9999px`), bold typography (`label-lg`), `#EA580C` background with white text. Employs an ambient orange drop shadow `0 10px 20px -5px rgba(234, 88, 12, 0.4)`. Transitions with subtle scale (`1.02`) on hover.
- **Secondary / Ghost**: White `#FFFFFF` background, subtle border `1px solid #E2E8F0`, neutral slate text. Transitions to primary tint on hover.
- **Outline Accent**: Pill radius, transparent background with `1.5px solid #EA580C`, primary colored text for high-visibility secondary actions (e.g., "Top Up Sekarang").

### Chips & Pill Badges
- **Hero Category Tag**: Pill shape, background `rgba(234, 88, 12, 0.08)`, border `1px solid rgba(234, 88, 12, 0.25)`, uppercase or sentence-case label in `#EA580C`.
- **Status Indicator**: Compact chip with a `6px` colored bullet dot (teal for active, orange for process, slate for pending).

### Cards & Feature Containers
- Constructed on `#FFFFFF` with `rounded-xl` (24px) borders.
- Sub-cards within feature grids use soft tinted neutral backgrounds (`#FFF7ED` or `#F8FAFC`) with no outer border to prevent clutter.
- Highlight cards (e.g., promotional or coin packages) feature a top accent gradient strip or an elevated orange border.

### Pricing Coin Calculator
- **Interactive Range Slider**: Primary orange track fill with a circular white thumb casting a diffuse shadow.
- **Coin Rate Display**: Monospaced tabular numeral presentation for dynamic currency calculations (`Rp 100 / Transaksi`).
- **Feature Checklists**: Standardized list items featuring circular mint-teal or orange checkmark icons (`w-5 h-5`) paired with `body-md` slate text.

### Form Inputs
- Pill or `rounded-lg` (12px) text inputs with an inset background of `#F8FAFC`, a border of `1px solid #E2E8F0`, transitioning to an orange glow ring (`0 0 0 3px rgba(234, 88, 12, 0.15)`) on focus.