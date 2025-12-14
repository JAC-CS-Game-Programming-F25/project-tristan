import Room from "../../objects/Room.js";
import Tile from "../../objects/Tile.js";
import GameEntity from "../GameEntity.js";
import StateMachine from "../../../lib/StateMachine.js";
import { getRandomPositiveInteger} from "../../../lib/Random.js";
import EnemyStateName from "../../enums/EnemyStateName.js";
import EnemyWalkingState from "../../states/entity/enemy/EnemyWalkingState.js";
import HealthBar from "../../user-interface/bars/HealthBar.js";

export default class Enemy extends GameEntity {
    static WIDTH = 16;
    static HEIGHT = 16;

    constructor(sprites, player) {
        super();

        this.sprites = sprites;
        this.position.x = getRandomPositiveInteger(
            Room.LEFT_EDGE,
            Room.RIGHT_EDGE - Tile.TILE_SIZE
        );
        this.position.y = getRandomPositiveInteger(
            Room.TOP_EDGE,
            Room.BOTTOM_EDGE - Tile.TILE_SIZE
        );

        this.dimensions.x = Enemy.WIDTH;
        this.dimensions.y = Enemy.HEIGHT;

        this.player = player;

        this.healthBar = new HealthBar(this.position.x, this.position.y, this, true);
    }

    update(dt) {
        super.update(dt);

        this.healthBar.update();
    }

    render() {
        super.render();

        this.healthBar.render();
    }

    receiveDamage(damage) {
        this.health -= damage;
    }

    initializeStateMachine(animations) {
		const stateMachine = new StateMachine();

		stateMachine.add(
			EnemyStateName.Walking,
			new EnemyWalkingState(this, animations[EnemyStateName.Walking], this.player)
		);

		stateMachine.change(EnemyStateName.Walking);

		return stateMachine;
	}
}