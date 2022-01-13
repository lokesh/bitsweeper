# Bitsweeper

## To-do
- [x] Support long press and right click for flagging
- [x] Add check for win state
- [x] Win state
- [x] Loss state
- [x] Add small number font
- [x] Add blinking to player and a worried fave on start of mouse/tap
- [ ] Add scoreboard UI - flag/mine counter (requires pixel font, make my own from sprites?), difficulty options, master volume? themes?
- [ ] Add settings

---
- [x] Limit right-click disabling to just the field. Be a good human.
- [ ] Sound: They are loud and grating! Using mine>explosion, thud/plant>flag, open>subtle chick. Add win sound.
- [ ] One more theme
- [ ] Animation: Add particles when you open block
- [ ] Animation: Flag placement
- [ ] Add loader
---
- [ ] Reduce sound file size. Convert to mp3?

## Bugs
- [ ] Random block sprites get set on clicking smiley and then again on first press
- [] Switching tabs on mobile and returning to game disables further sound playing. Or putting phone on sleep. Do I need to re-import sound files? see examples on howlerjs site which work properly.


## Lessons

- **Pixel art**
  - Define sprite size at start, mock up entire game board, as changing requires redrawing everything.
  - If using multiple sprite sizes, separate into different files. This makes writing shared utils to look up sprite position with row/col (x,y) vals easier.
  - Don't use Photoshop to make sprites. It is clunky (e.g. exporting requires 5 clicks; fight with dated interface) and overkill in featureset, try Aesprite.

