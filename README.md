# Bitsweeper

**Nice to haves**
- [x] Animation: Add particles when you open block
- [x] Add note about long press on mobile and right click
- [x] Add favicon
- [ ] Animation: Flag placement
- [ ] Add loader

## Bugs
- [x] Topbar layout shift on completion when arrow is made visible
- [x] Adjust opacities
- [x] Prevent scrolling on settings screen
- [x] Default 95vh is causing scrolling even on beginner level. Use simpler offset from top calc-ed from row count?
- [x] Random block sprites get set on clicking smiley and then again on first press
- [ ] Switching tabs on mobile and returning to game disables further sound playing. Or putting phone on sleep. Do I need to re-import sound files? see examples on howlerjs site which work properly.
The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
- [ ] Don't flag mines on scroll

## Architecture

**JS Framework**
- Vue 3.0 - First time using. Only a small hiccup as I had to translate the longpress directive into new format, easy enough though.
- Event Bus: Using Mitt library for event bus as attaching on/off handles on Vue Class is no longer feasible. Limited to usage with particle system.

**Visuals**
- Particles: Canvas element overlayed on top of app for particle effects.
- Custom font: Using a component to display custom pixel font.

## Lessons


- **Project Mgmt**
  - The README.md worked well for tracking to-dos and taking notes.
  - Game dev plumbing takes 4x longer than expected. This is the wiring up of screens, handling different states (ready, active, paused, won, lost, et al), building UI, and more.
- **Debugging**
  - Set up permanent debugging panel for variable watching and state toggling.
- **Pixel art**
  - Define sprite size at start, mock up entire game board, as changing requires redrawing everything.
  - If using multiple sprite sizes, separate into different files. This makes writing shared utils to look up sprite position with row/col (x,y) vals easier.
  - Don't use Photoshop to make sprites. It is clunky (e.g. exporting requires 5 clicks; fight with dated interface) and overkill in featureset, try Aesprite.
