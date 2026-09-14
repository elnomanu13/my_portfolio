---
name: Obsidian Precision
colors:
  surface: '#0b1420'
  surface-dim: '#0b1420'
  surface-bright: '#313a47'
  surface-container-lowest: '#060f1a'
  surface-container-low: '#131c28'
  surface-container: '#17202d'
  surface-container-high: '#222a37'
  surface-container-highest: '#2d3543'
  on-surface: '#dae3f4'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dae3f4'
  inverse-on-surface: '#28313e'
  outline: '#859398'
  outline-variant: '#3c494e'
  surface-tint: '#3cd7ff'
  primary: '#a8e8ff'
  on-primary: '#003642'
  primary-container: '#00d4ff'
  on-primary-container: '#00586b'
  inverse-primary: '#00677e'
  secondary: '#a1c9ff'
  on-secondary: '#00325a'
  secondary-container: '#3694ef'
  on-secondary-container: '#002b4f'
  tertiary: '#d4dff8'
  on-tertiary: '#263143'
  tertiary-container: '#b8c3db'
  on-tertiary-container: '#455064'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b4ebff'
  primary-fixed-dim: '#3cd7ff'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#a1c9ff'
  on-secondary-fixed: '#001c37'
  on-secondary-fixed-variant: '#004880'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7df'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475b'
  background: '#0b1420'
  on-background: '#dae3f4'
  surface-variant: '#2d3543'
  surface-overlay: rgba(14, 25, 40, 0.9)
  border-glass: rgba(123, 171, 223, 0.14)
  accent-glow: rgba(74, 163, 255, 0.24)
  text-muted: '#adc0da'
  error-red: '#ff8b8b'
typography:
  hero-lg:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.03em
  hero-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 42px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.12em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  header-height: 84px
  container-max: 1180px
  section-v-desktop: 104px
  section-v-mobile: 72px
---

## Brand & Style
The brand identity is rooted in the concept of "Obsidian Precision"—combining the dark, sharp aesthetics of volcanic glass with high-performance technical execution. It targets high-end B2B clients and tech-savvy enterprises who value stability, speed, and modern craftsmanship.

The visual style is a hybrid of **Glassmorphism** and **Technical Futurism**. It utilizes deep, layered dark surfaces, vibrant electric accents, and semi-transparent "glass" cards to create a sense of depth and sophistication. The overall mood is professional, innovative, and focused, avoiding unnecessary clutter in favor of high-contrast information density and subtle, high-tech animations like shimmer effects and soft glows.

## Colors
The palette is dominated by a deep obsidian navy (`#08111d`), providing a canvas for high-luminance accents. 

- **Primary & Secondary:** A gradient of electric cyans and cool blues serves as the primary action color, used for CTA backgrounds, icons, and text highlights. 
- **Surface Strategy:** Instead of flat grays, the system uses "Surface Tiers" built on varying shades of navy-blue. Interactive elements utilize glassmorphism (translucent overlays with back-drop blurs) to separate themselves from the background.
- **Accents:** Neon glows and shimmer effects utilize the primary color with low opacity to draw attention without breaking the dark-mode aesthetic.

## Typography
The system uses a tri-font hierarchy to balance technical precision with readability:
- **Space Grotesk (Headlines):** A geometric sans-serif with quirky, technical terminals used for high-impact display text.
- **Manrope (Body):** A modern, functional font optimized for legibility in long-form descriptions and interface labels.
- **JetBrains Mono (Labels/Technical):** Used for "metadata" roles, uppercase badges, and code snippets to reinforce the developer-centric aesthetic.

Ensure "Hero" text uses tight leading and slight negative tracking for a punchy, editorial look. Labels should always be in uppercase with generous tracking (0.12em) for professional "micro-copy" styling.

## Layout & Spacing
The layout follows a **Fixed-Width Bento Grid** philosophy. Content is contained within a 1180px center-aligned wrapper. 

- **The Bento Grid:** Large sections are broken down into logical "tiles" (glass cards) that vary in span (e.g., 8-column main content + 4-column sidebar).
- **Vertical Rhythm:** Generous white space (104px) between sections ensures a premium, uncluttered feel. 
- **Adaptation:** On mobile, the 12-column grid collapses to a single-column stack. Margins reduce from 32px to 24px, and vertical section spacing tightens to 72px.

## Elevation & Depth
The system rejects traditional drop shadows in favor of **Luminous Depth**:
- **Glass Cards:** Primary containers use a linear gradient (`from #16263c to #0a121e`), 1px semi-transparent borders (`border-glass`), and a 16px backdrop-blur.
- **Hover States:** Interaction is signaled by a `40px` soft cyan glow (`accent-glow`) and a subtle vertical lift (-4px).
- **Overlays:** Navigation and modals use `surface-overlay` with a heavy blur (blur-lg) to indicate they sit atop the main content plane.
- **Z-Axis Hierarchy:** Background elements are at Z-0; Bento cards sit at Z-10; Navigation sits at Z-50.

## Shapes
The shape language is "Hyper-Rounded" for large containers, juxtaposed with sharp internal elements. 
- **Cards:** Use a standard `24px` (rounded-3xl) radius to soften the technical look.
- **Buttons/Badges:** Primary actions use a `full` (pill-shaped) radius.
- **Small Elements:** Technical tags or code blocks use a smaller `4px` radius to maintain a structural, rigid feel inside the organic card shapes.

## Components
- **Buttons:** Feature a "Shimmer" animation. The primary CTA uses a diagonal gradient from `primary` to `secondary`. Secondary buttons use an `outline` style with a 30% opacity border.
- **Glass Cards:** The foundational container. Must include a subtle border-top highlight and a backdrop-blur.
- **Badges:** Small, pill-shaped markers with 10% background opacity of their text color. Used for "Available for projects" or "Tech Stack" tags.
- **Inputs:** Dark backgrounds with `outline-variant` borders. Focus state triggers a 1px `primary` border and a soft glow.
- **Technical Grid:** Used in the "Expertise" section, consisting of a square icon container (10% color tint) followed by a Space Grotesk headline.
- **Icons:** Use "Material Symbols Outlined" with a custom weight of 400. Actionable icons should be paired with the `primary` color.