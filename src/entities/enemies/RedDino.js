import Enemy from "./Enemy.js";
import EnemyStateName from "../../enums/EnemyStateName.js";
import Direction from "../../enums/Direction.js";
import Animation from "../../../lib/Animation.js";

export default class RedDino extends Enemy {
    static SPEED = 20;

    constructor(sprites, player, round) {
        super(sprites, player);

        this.direction = Direction.Right;

        this.hitboxOffsets.set(3, 15, -6, -10); // CHANGE THESE, TODOOOOOOOOOOOOOOOOOOOOOOOOO
        this.speed = RedDino.SPEED;

        this.totalHealth = 2 + Math.floor(round / 4);
        this.health = this.totalHealth;

        this.damage += Math.floor(round / 4);

        const animations = {
            [EnemyStateName.Walking]: {
                [Direction.Left]: new Animation([4, 5, 6, 7, 8, 9, 10], 0.2),
                [Direction.Right]: new Animation([4, 5, 6, 7, 8, 9, 10], 0.2),
            }
        }

        this.stateMachine = this.initializeStateMachine(animations);
    }
}