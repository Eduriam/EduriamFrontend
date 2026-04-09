---
name: Leaderboard and Avatar Components
overview: Implement the shared Avatar component (composite SVG layers with a config object) in `src/components/avatar/`, and the page-specific Leaderboard, LeaderboardZoneDivider, and LeaderboardListItem in `src/app/leaderboard/components/`, following existing patterns and implementation guidelines.
todos: []
isProject: false
---

# Leaderboard and Avatar implementation plan

## Scope

- **Avatar** (shared): `src/components/avatar/` — composite avatar from SVG layers, driven by a config object; SVGs loaded from `public/images/avatar/`.
- **Leaderboard** (page-specific): `src/app/leaderboard/components/` — Leaderboard (container), LeaderboardZoneDivider, LeaderboardListItem. No new page or route; components only.

## 1. Avatar component (`src/components/avatar/`)

**Location:** [src/components/avatar/](src/components/avatar/) (new folder).

**Behavior:** One config object defines all layer choices. The component resolves each layer to an SVG path under `public/images/avatar/`, stacks them in a fixed z-order, and renders (e.g. via `<img>` or inline SVG) in a sized container.

**Layer options (from requirements):**

- Skin color, body size, face, eye color
- Hair (split: hair behind head, hair in front of head)
- Hair color
- Accessories, glasses color
- Beard, beard color
- Headwear
- Clothing, clothing color
- Background color

**Implementation approach:**

- **Types:** Define `AvatarDefinition` (e.g. `skinColor`, `bodySize`, `face`, `eyeColor`, `hairBack`, `hairFront`, `hairColor`, `accessories`, `glassesColor`, `beard`, `beardColor`, `headwear`, `clothing`, `clothingColor`, `backgroundColor`). Use string unions per layer (e.g. `"hair_1" | "hair_2"`, `"brown" | "blonde"` for colors). Export from the Avatar module.
- **Asset convention:** One folder per layer (or per layer + variant). Path pattern: `/images/avatar/<layerName>/<option>.svg` (e.g. `/images/avatar/hair_back/hair_1.svg`). Document the expected structure so assets exported from [Figma (avatar node 40-2210)](https://www.figma.com/design/VZFuqWojrXq8yWjrBIq4OH/Eduriam-Web-App?node-id=40-2210&m=dev) can be dropped in. **Shape vs color:** One SVG per *shape* (e.g. one `hair_1.svg` for that hairstyle). Do *not* create separate SVGs per color variant (e.g. avoid `hair_1_brown.svg`, `hair_1_blonde.svg`).

**Color config and dynamic application:**

- Define a color palette in a config file in the Avatar component folder (e.g. `avatarColors.ts` or `avatar.config.ts`).
- The config maps semantic keys (e.g. `skinColor: "brown"`, `hairColor: "blonde"`) to actual CSS color values (hex, rgb, etc.).
- Each colorable layer (hair, skin, clothing, beard, glasses, background) uses a single SVG whose fill/stroke is intended to be overridden. SVGs should use `currentColor` or a designated class/id for the fillable area, so the component can apply the configured color dynamically (e.g. via `fill` or `color` + `currentColor` in a wrapper, or by injecting a `<style>` / inline `fill` when inlining the SVG).
- This keeps one SVG per layer variant (e.g. one hair shape) and many colors via config, instead of 6+ SVGs per hair shape for different colors.
- **Render order:** Stack layers in a single container (e.g. MUI `Box` with `position: relative` and absolutely positioned children, or a flex stack). Order: background first, then body, then hair-back, face, eyes, hair-front, accessories/glasses, beard, headwear, clothing (and apply colors via CSS/SVG where applicable). Exact order may be tuned when Figma layers are available; hair must be two layers (back, front).
- **Props:** `definition: AvatarDefinition`, optional `size` (number or preset), optional `alt` for accessibility.
- **Files:** `Avatar.tsx`, `avatarColors.ts` (or `avatar.config.ts`) — color palette and semantic key → CSS value mapping; `Avatar.stories.tsx`, `Avatar.mocks.ts` (one or two sample definitions). Storybook title: `avatar/Avatar`.

**Dependencies:** MUI `Box` (and optionally `Typography` only if we show a fallback). No new npm packages.

**Asset note:** `public/images/avatar/` does not exist yet. Implementation will assume the folder structure above; placeholder or fallback (e.g. single default SVG or empty slot) can be used until assets are exported from Figma.

---

## 2. Leaderboard list item (`src/app/leaderboard/components/LeaderboardListItem/`)

**Location:** [src/app/leaderboard/components/LeaderboardListItem/](src/app/leaderboard/components/LeaderboardListItem/) (new).

**Behavior:** One row: rank, avatar, user name, and any extra fields from design (e.g. league badge, points). Uses the shared Avatar with an `AvatarDefinition` prop.

**Props (suggested):**

- `rank: number`
- `name: string`
- `avatar: AvatarDefinition` (passed to Avatar)
- Optional: `leagueVariant?: LeagueIconVariant` (reuse [LeagueIcon](src/components/leaderboard/LeagueIcon.tsx)), or other fields from Figma (e.g. score)

**Layout:** Flex row: rank (number or badge), Avatar (small size), name; optional league icon/score on the right. Exact spacing and typography to match [Figma list item (45-3916)](https://www.figma.com/design/VZFuqWojrXq8yWjrBIq4OH/Eduriam-Web-App?node-id=45-3916&m=dev) during implementation.

**Files:** `LeaderboardListItem.tsx`, `LeaderboardListItem.stories.tsx`, `LeaderboardListItem.mocks.ts`. Storybook title: `pages/leaderboard/LeaderboardListItem`.

---

## 3. Leaderboard zone divider (`src/app/leaderboard/components/LeaderboardZoneDivider/`)

**Location:** [src/app/leaderboard/components/LeaderboardZoneDivider/](src/app/leaderboard/components/LeaderboardZoneDivider/) (new).

**Behavior:** Visual separator between zones, optionally with a label (e.g. “Promotion zone”, “Neutral”, “Demotion zone”).

**Props (suggested):**

- `label?: string` (optional zone title)
- Optional `variant` or `zone` for styling (e.g. promotion vs demotion color)

**Layout:** Horizontal rule and optional text; styling to match [Figma zone divider (45-4018)](https://www.figma.com/design/VZFuqWojrXq8yWjrBIq4OH/Eduriam-Web-App?node-id=45-4018&m=dev).

**Files:** `LeaderboardZoneDivider.tsx`, `LeaderboardZoneDivider.stories.tsx`, optional mocks. Storybook title: `pages/leaderboard/LeaderboardZoneDivider`.

---

## 4. Leaderboard container (`src/app/leaderboard/components/Leaderboard/`)

**Location:** [src/app/leaderboard/components/Leaderboard/](src/app/leaderboard/components/Leaderboard/) (new).

**Behavior:** Accepts an ordered list of users and splits them into three zones (promotion, neutral, demotion), then renders each zone with an optional LeaderboardZoneDivider and a list of LeaderboardListItem.

**Data shape:**

- **Input:** `users: Array<{ rank: number; name: string; avatar: AvatarDefinition; ... }>` (and optionally zone boundaries).
- **Zone split:** Either:
  - **Option A:** Parent passes zone boundaries, e.g. `promotionEndIndex: number`, `neutralEndIndex: number` (users before `promotionEndIndex` = promotion, then neutral, then demotion), or
  - **Option B:** Each user has `zone: 'promotion' | 'neutral' | 'demotion'` and Leaderboard groups by that.

Recommendation: **Option A** (indices) so a single ordered list is the source of truth and the page only decides “first N promotion, next M neutral, rest demotion”.

**Rendering:**

1. Slice `users` into three arrays from boundaries.
2. For each zone: optionally render `LeaderboardZoneDivider` (e.g. with label), then map users to `LeaderboardListItem` (rank, name, avatar, …).

**Props (suggested):**

- `users: LeaderboardUser[]`
- `promotionEndIndex: number` (exclusive: indices `0 .. promotionEndIndex - 1` are promotion)
- `neutralEndIndex: number` (exclusive: next segment is neutral; rest demotion)
- Optional i18n labels for the three zone dividers (or pass labels into the divider)

**Files:** `Leaderboard.tsx`, `Leaderboard.stories.tsx`, `Leaderboard.mocks.ts`. Storybook title: `pages/leaderboard/Leaderboard`. Stories: one with mixed zones, one with empty zone(s).

---

## 5. File and dependency summary

| Item                   | Path                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| Avatar                 | `src/components/avatar/Avatar.tsx`, `avatarColors.ts` (+ stories, mocks)                        |
| LeaderboardListItem    | `src/app/leaderboard/components/LeaderboardListItem/LeaderboardListItem.tsx` (+ stories, mocks) |
| LeaderboardZoneDivider | `src/app/leaderboard/components/LeaderboardZoneDivider/LeaderboardZoneDivider.tsx` (+ stories)  |
| Leaderboard            | `src/app/leaderboard/components/Leaderboard/Leaderboard.tsx` (+ stories, mocks)                 |

**Imports:**

- LeaderboardListItem and Leaderboard: import Avatar and types from `components/avatar/Avatar`.
- LeaderboardListItem: import LeagueIcon from `components/leaderboard/LeagueIcon` if showing league.
- Leaderboard: import LeaderboardZoneDivider and LeaderboardListItem from sibling folders (relative or path alias).

**Guidelines compliance:**

- Use `@eduriam/ui-core` / `@eduriam/ui-x` where a suitable primitive exists; avoid extra styling via `sx` when not needed.
- Page-specific components in `src/app/leaderboard/components/`; shared Avatar in `src/components/avatar/`.
- PascalCase component folders; each with `.tsx` and `.stories.tsx`; Storybook titles as above.

---

## 6. Figma and assets

- Figma MCP was not available in this environment. During implementation, pull exact layout, spacing, typography, and colors from:
  - [Leaderboard (45-3778)](https://www.figma.com/design/VZFuqWojrXq8yWjrBIq4OH/Eduriam-Web-App?node-id=45-3778&m=dev)
  - [Leaderboard zone divider (45-4018)](https://www.figma.com/design/VZFuqWojrXq8yWjrBIq4OH/Eduriam-Web-App?node-id=45-4018&m=dev)
  - [Leaderboard list item (45-3916)](https://www.figma.com/design/VZFuqWojrXq8yWjrBIq4OH/Eduriam-Web-App?node-id=45-3916&m=dev)
  - [Avatar (40-2210)](https://www.figma.com/design/VZFuqWojrXq8yWjrBIq4OH/Eduriam-Web-App?node-id=40-2210&m=dev)
- Export avatar layer SVGs from the Avatar node and place them under `public/images/avatar/` according to the layer naming convention decided in Avatar implementation.

---

## 7. Implementation order

1. **Avatar** — types, path resolution, layer stacking, stories and mocks. Establishes `AvatarDefinition` and asset convention.
2. **LeaderboardListItem** — uses Avatar and (if needed) LeagueIcon; matches Figma list item.
3. **LeaderboardZoneDivider** — simple divider + optional label.
4. **Leaderboard** — slicing by boundaries, composing dividers and list items.

This order keeps dependencies one-way (Avatar first, then list item, then container) and allows testing each piece in Storybook before wiring the full Leaderboard.
