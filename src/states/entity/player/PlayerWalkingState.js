import State from '../../../../lib/State.js';
import Player from '../../../entities/Player.js';
import Direction from '../../../enums/Direction.js';
import Animation from '../../../../lib/Animation.js';
import { input } from '../../../globals.js';
import Input from '../../../../lib/Input.js';
import Room from '../../../objects/Room.js';
import PlayerStateName from '../../../enums/PlayerStateName.js';

export default class PlayerWalkingState extends State {
    /**
     * 
     * @param {Player} player 
     */
    constructor(player) {
        super();

        this.player = player;

        this.animation = {
            [Direction.Right]: new Animation([82, 87, 92, 97, 102, 107, 112, 117], 0.1),
            [Direction.Left]: new Animation([82, 87, 92, 97, 102, 107, 112, 117], 0.1),
            [Direction.Down]: new Animation([282, 287, 292, 297, 302, 307, 312, 317], 0.1),
            [Direction.Up]: new Animation([482, 487, 492, 497, 502, 507, 512, 517], 0.1)
        }
    }

    enter() {
        this.player.sprites = this.player.walkingSprites;
        this.player.currentAnimation = this.animation[this.player.direction];
    }

    update(dt) {
        this.handleMovement(dt);
    }

    handleMovement(dt) {
        this.player.currentAnimation = this.animation[this.player.direction];

        if (input.isKeyPressed(Input.KEYS.S)) {
            this.player.direction = Direction.Down;
            this.player.position.y += this.player.speed * dt;

            if (
                this.player.position.y + this.player.dimensions.y >=
                Room.BOTTOM_EDGE
            ) {
                this.player.position.y = Room.BOTTOM_EDGE - this.player.dimensions.y;
            }
        } else if (input.isKeyPressed(Input.KEYS.D)) {
            this.player.isFacingLeft = false;
			this.player.direction = Direction.Right;
			this.player.position.x += this.player.speed * dt;

			if (
				this.player.position.x + this.player.dimensions.x >=
				Room.RIGHT_EDGE
			) {
				this.player.position.x =
					Room.RIGHT_EDGE - this.player.dimensions.x;
			}
		} else if (input.isKeyPressed(Input.KEYS.W)) {
			this.player.direction = Direction.Up;
			this.player.position.y -= this.player.speed * dt;

			if (
				this.player.position.y <=
				Room.TOP_EDGE - this.player.dimensions.y
			) {
				this.player.position.y =
					Room.TOP_EDGE - this.player.dimensions.y;
			}
		} else if (input.isKeyPressed(Input.KEYS.A)) {
            this.player.isFacingLeft = true;
			this.player.direction = Direction.Left;
			this.player.position.x -= this.player.speed * dt;

			if (this.player.position.x <= Room.LEFT_EDGE) {
				this.player.position.x = Room.LEFT_EDGE;
			}
		} else {
			this.player.changeState(PlayerStateName.Idle);
		}
    }
}