# MVP — Interactive 3D Drone Component Explorer

## Objective

Web-based interactive 3D drone component explorer. Users understand drone structure by viewing individual components and specifications through discrete scroll navigation.

**In scope:** component visualization, technical specifications, scroll-snap navigation.  
**Out of scope:** branding, marketing, sales, contact, industries, pricing, blogs.

---

## Pages (9 sections × 100vh)

| # | Section | Left (50%) | Right (50%) |
|---|---------|------------|-------------|
| 1 | Overview | Assembled drone (centered full width) | — |
| 2 | Propellers | 3D propeller (4×, highlighted) | Spec table |
| 3 | Motors | 3D motor | Spec table |
| 4 | ESC | 3D ESC board | Spec table |
| 5 | Battery | 3D battery pack | Spec table |
| 6 | Flight Controller | 3D FC + PDB | Spec table |
| 7 | GPS | 3D GPS module | Spec table |
| 8 | Camera | 3D gimbal camera | Spec table |
| 9 | Airframe | 3D carbon frame | Spec table |

### Page 1 copy (only)

```
DRONE ARCHITECTURE
Interactive Component Breakdown
↓ Scroll
```

No company name. No buttons. No marketing.

---

## Component spec schema

Each component page renders a **table only** (no paragraphs):

```
Component Name     (heading)
Purpose            → value
Type / Material    → value
Key specs          → value
Quantity           → value (if applicable)
Status             → Active Component
```

Progress: `01 / 08` … `08 / 08` on component pages.

---

## Scroll behavior

```css
scroll-snap-type: y mandatory;
scroll-snap-align: start;
scroll-snap-stop: always;
```

- One wheel tick → one section (PowerPoint-style)
- Lenis: `duration: 1.2`, `wheelMultiplier: 0.8`
- Keyboard: ↑ ↓ PageUp PageDown (optional)
- Touch: native snap + Lenis scrollTo

---

## 3D behavior

| State | Behavior |
|-------|----------|
| Overview | Full assembly, centered, all parts opacity 100% |
| Component active | Active part 4× scale, blue highlight, others 15% opacity |
| Assembled toggle | All parts merged, full opacity |
| Exploded toggle | Per-slide separation |
| 360° rotate | Auto-rotate drone |
| Hover | Emissive boost on hovered part |

Single `Canvas` (React Three Fiber). Camera lerps per component slide.

---

## Tech stack

```
HTML/CSS → scroll-snap layout, 50/50 split
JavaScript → scrollStore, wheel lock, section sync
React → SpecPanel, OverviewOverlay, controls
Next.js → App Router, client components
Three.js → meshes, PBR materials, lights
React Three Fiber → Canvas, useFrame
GSAP / Lenis → smooth scroll between snaps
Blender → (future) GLB with named parts per component
```

---

## File map

| File | Role |
|------|------|
| `src/components/mvp/ComponentExplorer.tsx` | Snap sections shell |
| `src/components/mvp/SpecPanel.tsx` | Right-side spec table |
| `src/components/mvp/OverviewOverlay.tsx` | Page 1 labels |
| `src/lib/droneComponents.ts` | Component order + specs + cameras |
| `src/lib/sections.ts` | 9 MVP sections |
| `src/hooks/useSnapSections.ts` | Wheel / keyboard snap |
| `src/components/cinematic/CinematicCanvas.tsx` | Single R3F canvas |
| `src/components/three/engineering/EngineeringDrone.tsx` | Procedural parts + explode |

---

## Performance targets

- 60 FPS desktop / 30 FPS mobile
- InstancedMesh particles
- One canvas, no duplicate WebGL contexts
- `dpr: [1, 1.5]`

---

## Acceptance criteria

- [ ] 9 full-viewport snap sections
- [ ] Overview shows assembled drone only + 3 lines of text
- [ ] 8 component pages with spec tables (no prose)
- [ ] Progress `NN / 08` on component pages
- [ ] Scroll one section per wheel action in explorer
- [ ] Assembled / Exploded + 360° controls
- [ ] No nav bar, footer, contact, or company branding
- [ ] Mobile: stacked layout (3D top, specs bottom)
