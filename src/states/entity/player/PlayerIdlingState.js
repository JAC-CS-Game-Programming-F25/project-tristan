import Animation from "../../../../lib/Animation.js";
import State from "../../../../lib/State.js";
import Player from "../../../entities/Player.js";
import Direction from "../../../enums/Direction.js";
import Input from "../../../../lib/Input.js";
import { input } from "../../../globals.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";

export default class PlayerIdlingState extends State {
    /**
     * 
     * @param {Player} player
     */
    constructor(player) {
        super();

        this.player = player;

        this.animation = {
            [Direction.Right]: new Animation([42, 47, 52, 57], 0.2),
            [Direction.Left]: new Animation([42, 47, 52, 57], 0.2),
            [Direction.Down]: new Animation([142, 147, 152, 157], 0.2),
            [Direction.Up]: new Animation([242, 247, 252, 257], 0.2),
        }
    }

    enter() {
        this.player.sprites = this.player.idlingSprites;
        this.player.currentAnimation = this.animation[this.player.direction];
    }

    update() {
        this.checkForMovement();
    }

    checkForMovement() {
		if (input.isKeyPressed(Input.KEYS.S)) {
			this.player.direction = Direction.Down;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.D)) {
			this.player.direction = Direction.Right;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.W)) {
			this.player.direction = Direction.Up;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.A)) {
			this.player.direction = Direction.Left;
			this.player.changeState(PlayerStateName.Walking);
		}
	}
}