Day1 / 13.01.25: 
create skeleton/structure for programming the game,	
adjust collectable items and spritesheets to the code,
start programming

14.01.25:
The playable character and the collectable items now appear on the screen, collectables also have the right direction, where they're moving to.,
food items (and bomb items) now either give you an amount of hunger (currently it's under "health") or take that amount. should also now spawn randomly after fixing the widths and heights of each item.,
adjusted background to the right size.

15.01.25:
make the jump work on spacebar and case w, adjusted jumpForce, jumpLoading and loadJump, 
the foodItems and bombItems were adjusted in height and width. 

16.01.25:
cleaning up code, repaired jump, spritesheet, canvas, removed elements in index.html because they would later be a problem, 
Collectables didn't appear randomly and were called in html: now they are spawning randomly once. (need them to spawn endlessly, not once).

17.01.25:
Cat now doesn't jump over the canvas, tried to find bugs and debug my code, also clean up code I don't need anymore and was already commented out.

19.01.25:
let collectables spawn randomly of every kind and randomly on the screen but before the player, make collision detection for collectables, 
and when player collides with collectable, collectable vanishes.

20.01.25:
background is now moving in the direction of the player. collectables appear randomly in front of the player, 
collectables are collectable but bombs do not yet have another function if collected. 
created a score to keep track of the collected food and bomb items.

21.01.25:
find some kind of "reward" for the player, reward is to keep the cat chonky
adjusted the size of the collectables again.

background and collectables stop when game over "screen" appears, almost.

22.01.25:
start screen, game over screen, background and collectables stop when game over, stop collectables spawn under the floor.

23.01.25:
start screen, end screen, spritesheets work (cat runs also when jumping but that's not a big issue), 
make the end screen work when cat runs into a bomb or the hunger bar runs out. also make the replay button work, 
design of hunger bar and implementation of the working hungerbar, also with colors displaying the state of player's hunger, 
find out how much hunger you should regain from a food item, finish game and upload.