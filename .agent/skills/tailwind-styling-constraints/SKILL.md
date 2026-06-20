---
name: tailwind-styling-constraints
description: Use this skill whenever writing or reviewing Tailwind CSS, component styling, or design system implementations to maintain consistency and scalability.
---

---

# Goal

Ensure all styling follows the project's design system and remains maintainable, scalable, and consistent across the application.

# Instructions

## Design System

- Use only approved spacing, typography, color, and sizing tokens.
- Prefer values from the Tailwind configuration.
- Follow established design system conventions.

## Tailwind Class Organization

Organize classes in the following order:

1. Layout
2. Flex/Grid
3. Spacing
4. Sizing
5. Typography
6. Colors
7. Borders
8. Effects
9. Interactive States

Example:

```tsx
<div className="
  flex flex-col
  gap-4 p-4
  w-full
  text-sm font-medium
  text-slate-900 bg-white
  border border-slate-200 rounded-lg
  shadow-sm
  hover:shadow-md
">
```

## Dynamic Styling

- Use `clsx`, `tailwind-merge`, or equivalent utilities.
- Avoid manual string concatenation for conditional classes.

Example:

```tsx
const buttonClass = cn(
  "rounded-md px-4 py-2",
  isPrimary ? "bg-primary text-primary-foreground" : "border border-input",
);
```

## Custom CSS

- Prefer Tailwind utilities first.
- Use CSS Modules when custom styling is required.
- Prevent global CSS leakage.

## Responsive Styling

- Follow a mobile-first approach.
- Base classes apply to mobile.
- Use `md:` and `lg:` modifiers for larger screens.

# Constraints

- Do not use arbitrary Tailwind values unless absolutely necessary.
- Do not manually concatenate complex class strings.
- Do not introduce design tokens outside the approved design system.
- Do not use global CSS for component-specific styling.
- Do not implement desktop-first responsive patterns.

# Examples

## Input

Create a reusable button component.

## Output

- Uses Tailwind design tokens.
- Uses clsx or tailwind-merge.
- Mobile-first responsive styling.
- No arbitrary values.
- Consistent spacing and typography.
