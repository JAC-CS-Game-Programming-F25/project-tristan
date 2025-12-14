import Enemy from "./Enemy.js";
import EnemyStateName from "../../enums/EnemyStateName.js";
import Direction from "../../enums/Direction.js";
import Animation from "../../../lib/Animation.js";

export default class GreenDino extends Enemy {
    static SPEED = 20;

    constructor(sprites, player) {
        super(sprites, player);

        this.direction = Direction.Right;

        this.hitboxOffsets.set(3, 10, -6, -10); // CHANGE THESE, TODOOOOOOOOOOOOOOOOOOOOOOOOO
        this.speed = GreenDino.SPEED;

        this.totalHealth = 4;
        this.health = this.totalHealth;

        const animations = {
            [EnemyStateName.Walking]: {
                [Direction.Left]: new Animation([4, 5, 6, 7, 8, 9, 10], 0.2),
                [Direction.Right]: new Animation([4, 5, 6, 7, 8, 9, 10], 0.2),
            }
        }

        this.stateMachine = this.initializeStateMachine(animations);
    }
}