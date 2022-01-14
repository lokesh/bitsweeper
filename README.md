# Bitsweeper

**Nice to haves**

- [x] Sound: They are loud and grating! Using mine>explosion, thud/plant>flag, open>subtle chick. Add win sound.
- [x] One more theme
- [ ] Animation: Add particles when you open block
- [ ] Animation: Flag placement
- [ ] Add loader

## Bugs
- [x] 100vh is too much, causing spaceing beause of Safari's address bar floating above
- [ ] Don't flag mines on scroll
- [ ] Random block sprites get set on clicking smiley and then again on first press
- [ ] Switching tabs on mobile and returning to game disables further sound playing. Or putting phone on sleep. Do I need to re-import sound files? see examples on howlerjs site which work properly.
The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu

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
