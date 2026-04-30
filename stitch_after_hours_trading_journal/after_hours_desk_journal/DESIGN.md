---
name: After Hours' Desk Journal
colors:
  surface: '#faf9fc'
  surface-dim: '#dad9dd'
  surface-bright: '#faf9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f6'
  surface-container: '#eeedf1'
  surface-container-high: '#e9e8eb'
  surface-container-highest: '#e3e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#43474e'
  inverse-surface: '#2f3033'
  inverse-on-surface: '#f1f0f3'
  outline: '#73777f'
  outline-variant: '#c3c6cf'
  surface-tint: '#436084'
  primary: '#002444'
  on-primary: '#ffffff'
  primary-container: '#1a3a5c'
  on-primary-container: '#87a4cc'
  inverse-primary: '#abc9f2'
  secondary: '#006c46'
  on-secondary: '#ffffff'
  secondary-container: '#94f3bf'
  on-secondary-container: '#007149'
  tertiary: '#4f0000'
  on-tertiary: '#ffffff'
  tertiary-container: '#780001'
  on-tertiary-container: '#ff7967'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#abc9f2'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#2a486b'
  secondary-fixed: '#97f6c2'
  secondary-fixed-dim: '#7bd9a7'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005234'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#8e130c'
  background: '#faf9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e3e2e5'
typography:
  h1:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  h2:
    fontFamily: Work Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  h3:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar_width: 168px
  container_gap: 24px
  card_padding: 20px
  unit: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is engineered for the disciplined retail trader. It evokes a sense of "after-hours" focus—calm, analytical, and devoid of the chaotic noise found in live trading terminals. The brand personality is **Sleek, Professional, and Scholarly**, treating trading as a serious craft rather than a game.

The UI style follows a **Modern Minimalist** approach. It prioritizes data clarity through significant white space, high-contrast typography for financial figures, and a card-based architecture that organizes complex trade data into digestible insights. Visual flourishes are suppressed in favor of utility and precision.

## Colors

The palette is anchored by **Dark Navy (#1A3A5C)**, utilized for authoritative elements such as headings, primary navigation, and active interaction states. This provides a stable, institutional foundation.

Semantic signaling is critical: 
- **Forest Green (#0A7A50)** is reserved strictly for profits, positive PnL, and upward trends.
- **Crimson Red (#C0392B)** is used for losses, drawdowns, and negative indicators.

The background uses a tiered approach: **Light Gray (#F8F9FA)** for the application canvas and pure **White (#FFFFFF)** for the cards and sidebar, creating a subtle contrast that defines the workspace without the need for heavy borders.

## Typography

This design system utilizes **Work Sans** for headings to provide a grounded, professional structure. **Inter** is used for all body copy and financial data due to its exceptional legibility at small sizes and its "tabular num" (tnum) support, which ensures numerical data aligns perfectly in columns.

To maintain hierarchy in dense data environments:
- Use **data-mono** for PnL figures and trade prices.
- Use **label-caps** in Dark Navy at 60% opacity for table headers and metadata descriptors.

## Layout & Spacing

The layout is centered around a **Fixed Left Sidebar** (168px) and a fluid main dashboard. The dashboard utilizes a standard 12-column grid system with a 24px gutter. 

Spacing follows a 4px scale to ensure mathematical consistency. Large cards should be separated by 24px, while internal card elements (like header-to-chart spacing) should utilize 16px. The sidebar is intentionally narrow to maximize the horizontal real estate for price charts and trade logs.

## Elevation & Depth

Hierarchy is established through **Low-contrast Outlines** and **Ambient Shadows**. 

- **Level 0 (Canvas):** Light Gray background (#F8F9FA).
- **Level 1 (Cards/Sidebar):** White background with a 1px border (#E2E8F0) and a very soft, diffused shadow (0px 2px 4px rgba(26, 58, 92, 0.04)).
- **Level 2 (Popovers/Modals):** White background with a more pronounced shadow (0px 10px 15px rgba(26, 58, 92, 0.1)) and a slightly darker border.

The goal is to keep the interface looking "flat" but physically structured, mimicking paper-on-desk organization.

## Shapes

The design system employs a **Soft (0.25rem)** roundedness level. This subtle rounding softens the professional "grid" without becoming playful or informal. 

- **Primary Buttons & Inputs:** 4px (0.25rem) border-radius.
- **Data Cards:** 8px (0.5rem) border-radius for a more distinct structural presence.
- **Status Tags/Chips:** Full pill-shape (100px) to distinguish them from interactive buttons.

## Components

### Buttons & Inputs
- **Primary Action:** Solid Dark Navy background with White text.
- **Secondary Action:** Ghost style with Dark Navy border and text.
- **Inputs:** White background, 1px border (#E2E8F0). On focus, the border shifts to Dark Navy with a 2px outer "halo" of light blue.

### Cards & Data Visualization
- **Trade Cards:** Contain a header with the ticker symbol, a small sparkline chart, and the PnL value.
- **PnL Indicators:** Must include the currency symbol and use the semantic Green/Red for the entire text string.

### Sidebar Navigation
- Icons should be 20px, outlined style. 
- The active state is indicated by a 3px Dark Navy vertical bar on the left edge and the icon/text shifting to Dark Navy (Weight: 600).

### Data Tables
- Clean, row-based layout with no vertical borders. 
- Alternating row highlights (Zebra striping) are discouraged; use thin 1px horizontal dividers instead to maintain the minimalist aesthetic.

### Specialized Components
- **Win-Rate Gauge:** A circular or semi-circular progress bar using Forest Green.
- **Trade Tagging Chips:** Small, low-saturation backgrounds with high-saturation text for categorizing strategies (e.g., "Breakout", "Scalp").