# Logo Files

Place your logo files in this directory:

- `logo-light.png` - Logo for light mode (dark logo on light background)
- `logo-dark.png` - Logo for dark mode (light logo on dark background)

**Recommended specifications:**
- Format: PNG with transparent background
- Size: 120x60 pixels (or maintain similar aspect ratio)
- File size: Keep under 50KB for optimal loading

**Current configuration:**
- The logos will appear at the top of both the waitlist and manifesto cards
- They are center-aligned
- The component automatically switches between light/dark versions based on the theme
- Default size is 120x60 pixels but can be customized

**To update logo paths or settings:**
Edit the `logoConfig` object in `/components/logo.tsx`