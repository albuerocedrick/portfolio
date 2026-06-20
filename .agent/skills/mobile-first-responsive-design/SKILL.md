---
name: mobile-first-responsive-design
description: Use this skill whenever designing, generating, reviewing, or refactoring user interfaces to ensure they are responsive, touch-friendly, and optimized for mobile, tablet, and desktop devices.
---

---

# Goal

Create responsive interfaces that prioritize mobile users while scaling effectively to larger screens.

# Instructions

## Layout Strategy

- Start with a 375px mobile viewport.
- Build mobile layouts first before adding tablet and desktop enhancements.
- Apply responsive improvements progressively using `md:` and `lg:` breakpoints.

## Responsive Behavior

- Stack side-by-side content vertically on mobile screens.
- Convert multi-column layouts into single-column layouts when space is limited.
- Expand layouts progressively on larger screens.

## Navigation

- Hide secondary navigation behind a drawer or hamburger menu on mobile.
- Display full navigation on desktop.
- Place advanced filters and controls inside collapsible panels on mobile.

## Touch Accessibility

- Ensure all clickable elements are at least 44x44px.
- Maintain adequate spacing between interactive elements.

## Overflow Prevention

- Use `max-w-full` for containers.
- Use `break-words` for long text.
- Prevent horizontal scrolling on all viewport sizes.
- Verify layouts on mobile, tablet, and desktop.

# Constraints

- Do not design desktop-first layouts.
- Do not create touch targets smaller than 44x44px.
- Do not use fixed widths that break responsiveness.
- Do not allow horizontal overflow.
- Do not expose complex navigation directly on mobile when a drawer pattern is appropriate.

# Examples

## Input

Create a dashboard page with navigation and content.

## Output

- Mobile: Navigation hidden behind a hamburger menu.
- Tablet/Desktop: Navigation visible.
- Content stacks correctly on mobile.
- No horizontal scrolling.
- Touch-friendly controls.
