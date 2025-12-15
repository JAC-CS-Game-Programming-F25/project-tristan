import Input from "../../lib/Input.js";
import Sprite from "../../lib/Sprite.js";
import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import ImageName from "../enums/ImageName.js";
import { images, input, stateStack, context, CANVAS_HEIGHT, CANVAS_WIDTH } from "../globals.js";
import TitleScreenState from "./TitleScreenState.js";
import TransitionState from "./TransitionState.js";

export default class VictoryState extends State {
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
	}

	update() {
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			var titleScreenState = new TitleScreenState();

			TransitionState.fade(() => {
				stateStack.pop();

				stateStack.push(titleScreenState);
			});
		}
	}

	render() {
		this.sprite[0].render(0, 0);

		context.save();
		context.font = '80px aria';
		context.fillStyle = 'blue';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Victory!', CANVAS_WIDTH / 2 + 40, CANVAS_HEIGHT / 2 - 50);
		context.font = '20px aria';
		context.fillStyle = 'white';
		context.fillText(
			'Press Enter to Continue',
			CANVAS_WIDTH / 2 + 30,
			CANVAS_HEIGHT - 20
		);
		context.restore();
	}
}
