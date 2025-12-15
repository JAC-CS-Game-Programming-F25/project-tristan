/**
 * Game Name
 * Protato
 *
 * Authors
 * Tristan Raymond
 *
 * Brief description
 * Brotato but worse I guess
 *
 * Asset sources
 * Dungeon:
 * @see https://pixel-poem.itch.io/dungeon-assetpuck
 * 
 * Enemies:
 * @see https://arks.itch.io/dino-characters
 * 
 * Icons:
 * @see https://clockworkraven.itch.io/raven-fantasy-icons
 * 
 * Player:
 * @see https://otterisk.itch.io/hana-caraka-base-character
 * 
 * Brotato cover:
 * @see https://en.wikipedia.org/wiki/Brotato
 * 
 * Font:
 * @see https://fonts.google.com/specimen/VT323
 * 
 * Item Obtain Sound from Pokemon (my in-between rounds sound):
 * @see https://www.myinstants.com/en/instant/pokemon-item-found-50824/
 */

import GameStateName from './enums/GameStateName.js';
import Game from '../lib/Game.js';
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	fonts,
	images,
	timer,
	sounds,
	stateStack,
} from './globals.js';
import PlayState from './states/PlayState.js';
import GameOverState from './states/GameOverState.js';
import VictoryState from './states/VictoryState.js';
import TitleScreenState from './states/TitleScreenState.js';

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// Fetch the asset definitions from config.json.
const {
	images: imageDefinitions,
	fonts: fontDefinitions,
	sounds: soundDefinitions,
} = await fetch('./src/config.json').then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);

// Add all the states to the state machine.
stateStack.push(new TitleScreenState());

const game = new Game(
	stateStack,
	context,
	timer,
	canvas.width,
	canvas.height
);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
