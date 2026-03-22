# Design System Specification: The Architectural Minimalist

## 1. Overview & Creative North Star
The creative North Star for this design system is **"The Digital Architect."**

We are moving away from the chaotic, "pasted-together" look of student org portals and toward a sophisticated, high-end editorial experience. This system reflects the Maru identity: closing the gap between design thinking and business strategy with the precision of modern architecture.

Rather than a standard grid, we utilize **intentional asymmetry** and **breathable tonal layering**. High-contrast typography scales create a clear visual hierarchy, while the generous use of dark space ensures that content feels focused and intentional. We treat every page as a canvas where "void" (empty space) is as important as the content itself.

The name "Maru" (circle) informs our visual philosophy — completeness through simplicity, wholeness through restraint.

---

## 2. Colors: Dark Foundation & Orange Energy
Our palette is built on deep, layered blacks — anchored by a warm orange accent and supported by a range of charcoal and dark gray tones that give the site its cinematic weight.

### Core Palette
* **Accent (Orange):** `#E87A1E` — the primary energy color. Used for CTAs, highlights, and key branding moments.
* **Accent Hover:** `#F59A3E` — lighter orange for hover states and secondary emphasis.
* **Accent Muted:** `#C46A18` — darker orange for pressed states and subtle accents.
* **On Accent:** `#000000` — text on orange backgrounds.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts.
- To separate the Hero from subsequent sections, transition from `surface` (`#0A0A0A`) to `surface_container_low` (`#111111`).
- This creates a soft, architectural edge that feels native to the screen, rather than a forced "box."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create depth:
* **Base:** `surface` (`#0A0A0A`) for the primary background. Near-black with warmth.
* **Layer 1:** `surface_container_low` (`#111111`) for secondary content areas.
* **Layer 2:** `surface_container` (`#1A1A1A`) for cards, nav, and elevated content.
* **Layer 3 (The Inset):** `surface_container_high` (`#222222`) for code blocks, highlighted details, or interactive areas.

### Text Colors
* **Primary text:** `#F5F5F5` — warm white for headlines and body. Never use pure `#FFFFFF`.
* **Secondary text:** `#A0A0A0` — muted gray for supporting copy, metadata, and labels.
* **Disabled text:** `#555555` — low-contrast for inactive states.

### The "Glass & Gradient" Rule
For floating elements (like Navigation or Mobile Menus), use **Glassmorphism**. Use `surface` (`#0A0A0A`) at 80% opacity with a `20px` backdrop-blur.
For primary CTAs, apply a subtle linear gradient from `#C46A18` to `#E87A1E` at a 135-degree angle. This adds depth and gives the orange a warm glow rather than a flat look.

---

## 3. Typography: Editorial Authority
We use a dual-font approach to balance personality with readability.

* **Display & Headlines (Manrope):** Chosen for its geometric precision. Use `display-lg` (3.5rem) for hero headers to command attention. The wide tracking and clean lines of Manrope embody the Maru identity — modern, clean, and structured. Color: `#F5F5F5`.
* **Body & Labels (Inter):** The industry standard for UI legibility. Inter ensures all body content is effortless to read against dark backgrounds.
  * **Body-lg (1rem):** Use for section descriptions and featured content. Color: `#F5F5F5`.
  * **Label-md (0.75rem):** Use for metadata, tags, and supporting details. Color: `#A0A0A0`.

The hierarchy is intentionally steep. A `display-lg` headline should sit comfortably above `body-lg` text, using the **Spacing Scale (8 or 10)** to provide enough "air" between the two, conveying authority.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden unless specified. We achieve elevation through color science — subtle shifts between near-black tones.

* **The Layering Principle:** Place a `surface_container` (`#1A1A1A`) card on top of a `surface_container_low` (`#111111`) background. The subtle difference in hex value provides a "natural lift" without the clutter of shadows.
* **Ambient Shadows:** If an element must float (e.g., a modal), use a shadow with a blur of `40px` and an opacity of `15%`. Use `#000000` as the shadow tint — on dark backgrounds, shadows need higher opacity to register.
* **The "Ghost Border":** For input fields or cards where a boundary is critical for accessibility, use `#E87A1E` at **10% opacity**. This creates a warm suggestion of a container rather than a hard cage.
* **Orange Glow:** For focused or highlighted elements, use a `0 0 20px rgba(232, 122, 30, 0.15)` box-shadow to create a subtle warm halo.

---

## 5. Components

### Buttons
* **Primary:** Background: Gradient `#C46A18` to `#E87A1E` at 135°. Text: `#000000`. Corner Radius: `full` (pill shape). Hover: shift gradient toward `#F59A3E`. Active glow: `0 0 20px rgba(232, 122, 30, 0.3)`.
* **Secondary:** Background: `#1A1A1A`. Text: `#E87A1E`. Border: Ghost Border (orange at 10%). Hover: background shifts to `#222222`.
* **Tertiary:** No background. Text: `#E87A1E`. Use for "Read More" or "Learn More" links. Hover: underline.

### Cards (Features & Team)
* **Style:** No explicit borders. Use `surface_container` (`#1A1A1A`) on `surface_container_low` (`#111111`) backgrounds.
* **Padding:** Use Spacing Scale `6` (2rem) for internal padding to ensure content doesn't feel cramped.
* **Interaction:** On hover, shift background to `surface_container_high` (`#222222`) and apply an orange-tinted Ambient Shadow at 8% opacity.

### Inputs & Forms
* **Style:** Minimalist. Background: `surface_container` (`#1A1A1A`). Ghost Border (orange at 10%).
* **Placeholder text:** `#555555`.
* **Focus State:** Ghost Border becomes `#E87A1E` at 60% opacity with a `0 0 12px rgba(232, 122, 30, 0.2)` outer glow.

### Section Layout
* **Style:** Do not use divider lines between sections. Separate sections through background color shifts per the No-Line Rule. Use Spacing Scale `4` (1.4rem) between list items.

---

## 6. The 3D Scene
The Three.js hero scene is the signature visual element of the Maru site. It should feel **warm and cinematic**, not tech-demo flashy.

* **Lighting:** Warm amber/orange hemisphere light. The scene should feel like a late-night studio — inviting, not clinical. Accent the geometry with orange-tinted spotlights.
* **Geometry:** The torus + wireframe icosahedron pairing represents the Maru concept — the smooth circle (completeness) intersected by structure (strategy). Material color: silver or warm white to catch the orange light.
* **Interaction:** Orbit controls on desktop give users agency. On mobile, disable by default to preserve scroll behavior.
* **Fog:** Use warm dark fog (`#1a0e0a`) to create depth and fade edges naturally into the black background.
* **Background:** The canvas background should be transparent or match `surface` (`#0A0A0A`) so the scene blends seamlessly into the page.

---

## 7. Do's and Don'ts

### Do:
* **DO** use dark space as a functional tool. If a section feels crowded, double the spacing token (e.g., move from `8` to `16`).
* **DO** use orange sparingly as an "energy" color — save it for CTAs, key branding elements, and interactive states. Too much orange on black looks aggressive.
* **DO** ensure all text on dark surfaces maintains a contrast ratio of 4.5:1. `#F5F5F5` on `#0A0A0A` = 18.1:1 (excellent). `#A0A0A0` on `#0A0A0A` = 8.5:1 (good).
* **DO** let the 3D scene breathe — the hero section needs generous height to let the animation and the headline coexist without competition.
* **DO** use the orange glow effect to draw attention to interactive elements — it reinforces the warm, inviting tone.

### Don't:
* **DON'T** use 1px solid borders. It breaks the architectural fluidity of the system. Use tonal shifts instead.
* **DON'T** use pure white (`#FFFFFF`) for text. It's too harsh on dark backgrounds. Use `#F5F5F5` instead.
* **DON'T** use pure black (`#000000`) for backgrounds. Use `#0A0A0A` or warmer near-blacks to avoid a "void" feel.
* **DON'T** use the Maru logo at small sizes without adequate clear space (at least Spacing Scale `5`).
* **DON'T** use standard "Drop Shadows." If it looks like a default Photoshop style, it doesn't belong here.
* **DON'T** center-align long blocks of text. Stick to editorial left-alignment to maintain the "Architectural" grid. (Short headlines and CTAs may be centered.)
* **DON'T** add visual clutter that competes with the 3D scene. The hero is the statement — everything else supports it.
* **DON'T** pair orange with blue or green accents. The palette is monochromatic black + single warm accent. Keep it disciplined.
