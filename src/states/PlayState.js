import State from "../../lib/State.js";
import { timer, stateStack } from "../globals.js";
import Room from "../objects/Room.js";
import Player from "../entities/Player.js";
import UserInterface from "../services/UserInterface.js";
import GameStateName from "../enums/GameStateName.js";
import Enemy from "../entities/enemies/Enemy.js";
import TransitionState from "./TransitionState.js";
import VictoryState from "./VictoryState.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.round = "Starting";

		this.isStarting = true;

		this.player = new Player();
		this.room = new Room(this.player);
		this.userInterface = new UserInterface(this.player, this.round);

		this.victoryState = new VictoryState();
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
			stateStack.change(GameStateName.Transition, {
				fromState: this,
				toState: stateStack.states[GameStateName.GameOver],
			});
		}

		if (this.userInterface.time <= 0) {
			this.isStarting = false;
			this.round = 0;
		}

		if (
			(this.userInterface.time <= 0 || 
			this.room.entities.filter(
				(entity) => entity instanceof Enemy
			).length === 0) &&
			!this.isStarting
		) {
			this.userInterface.time = 60;

			this.round += 1;
			this.userInterface.round = this.round;

			this.room.entities = this.room.generateEntities(this.round);
		}
	}

	render() {
		this.room.render();
		this.userInterface.render();
	}
}
