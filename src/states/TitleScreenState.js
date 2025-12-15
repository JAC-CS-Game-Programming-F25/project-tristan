import Input from "../../lib/Input.js";
import Sprite from "../../lib/Sprite.js";
import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import ImageName from "../enums/ImageName.js";
import { images, input, stateStack, context, CANVAS_HEIGHT, CANVAS_WIDTH } from "../globals.js";
import InstructionsState from "./InstructionsState.js";
import PlayState from "./PlayState.js";
import TransitionState from "./TransitionState.js";
import VictoryState from "./VictoryState.js";

export default class TitleScreenState extends State {
	static BACKGROUND = {
		WIDTH: 460,
		HEIGHT: 215
	}

	constructor() {
		super();

		this.sprite = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Brotato),
			VictoryState.BACKGROUND.WIDTH,
			VictoryState.BACKGROUND.HEIGHT
		)

		this.instructionsState = new InstructionsState();
	}

	update() {
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			TransitionState.fade(() => {
				stateStack.pop();
				stateStack.push(this.instructionsState);
			})
		}
	}

	render() {
		this.sprite[0].render(0, 0);

		context.save();
		context.font = '20px VT323';
		context.fillStyle = 'grey';
		context.fillText(
			'Press Enter to Start',
			CANVAS_WIDTH / 2 - 50,
			CANVAS_HEIGHT - 20
		);
		context.restore();
	}
}
