import State from "../../lib/State.js";
import { timer, stateStack, sounds } from "../globals.js";
import Room from "../objects/Room.js";
import Player from "../entities/Player.js";
import UserInterface from "../services/UserInterface.js";
import GameStateName from "../enums/GameStateName.js";
import Enemy from "../entities/enemies/Enemy.js";
import TransitionState from "./TransitionState.js";
import VictoryState from "./VictoryState.js";
import GameOverState from "./GameOverState.js";
import ShopState from "./ShopState.js";
import SoundName from "../enums/SoundName.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.round = "Starting";

		this.isStarting = true;

		this.isInBetween = false;

		this.player = new Player();
		this.room = new Room(this.player);
		this.userInterface = new UserInterface(this.player, this.round);

		this.victoryState = new VictoryState();
		this.gameOverState = new GameOverState();
	}

	enter() {
		super.enter();

		this.userInterface.time = 5;
	}

	update(dt) {
		this.room.update(dt);

		timer.update(dt);

		if (this.round === 10) {
			TransitionState.fade(() => {
				stateStack.pop();
				stateStack.push(this.victoryState);
			})
		}

		if (this.player.isDead) {
			TransitionState.fade(() => {
				stateStack.pop();

				stateStack.push(this.gameOverState);
			});
		}

		if (this.userInterface.time <= 0 && this.isStarting) {
			this.isStarting = false;
			this.round = 0;
			
			this.isInBetween = true;
		}
		
		if (this.userInterface.time <= 0 && this.isInBetween) {
			this.isInBetween = false;
			this.userInterface.time = 60;

			this.round += 1;
			
			this.userInterface.round = this.round;

			this.room.entities = this.room.generateEntities(this.round);
			
		} else if (
			(this.userInterface.time <= 0 || 
			this.room.entities.filter(
				(entity) => entity instanceof Enemy
			).length === 0) &&
			!this.isInBetween && !this.isStarting
		) {
			sounds.play(SoundName.NewRound);

			stateStack.push(new ShopState(this.player));

			this.userInterface.time = 5;

			this.userInterface.round = this.round + 1;

			this.isInBetween = true;
		}
	}

	render() {
		this.room.render();
		this.userInterface.render();
	}
}
