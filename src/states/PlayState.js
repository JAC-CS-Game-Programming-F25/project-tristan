import State from "../../lib/State.js";
import { timer, stateMachine } from "../globals.js";
import Room from "../objects/Room.js";
import Player from "../entities/Player.js";
import UserInterface from "../services/UserInterface.js";
import GameStateName from "../enums/GameStateName.js";
import Enemy from "../entities/enemies/Enemy.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.round = "Starting";

		this.isStarting = true;

		this.player = new Player();
		this.room = new Room(this.player);
		this.userInterface = new UserInterface(this.player, this.round);
	}

	update(dt) {
		this.room.update(dt);

		timer.update(dt);

		if (this.player.isDead) {
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.GameOver],
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

			this.room.entities = this.room.generateEntities();
		}
	}

	render() {
		this.room.render();
		this.userInterface.render();
	}
}
