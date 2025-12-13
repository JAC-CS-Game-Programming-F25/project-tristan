import State from "../../lib/State.js";
import { timer } from "../globals.js";
import Room from "../objects/Room.js";
import Player from "../entities/Player.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.player = new Player();
		this.room = new Room(this.player);
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
	}

	render() {
		this.room.render();
	}
}
