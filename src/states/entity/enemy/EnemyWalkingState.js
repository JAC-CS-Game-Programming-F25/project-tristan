import State from "../../../../lib/State.js";
import Enemy from "../../../entities/enemies/Enemy.js";
import Animation from "../../../../lib/Animation.js";
import Player from "../../../entities/Player.js";
import Direction from "../../../enums/Direction.js";

export default class EnemyWalkingState extends State {
    /**
     * 
     * @param {Enemy} enemy
     * @param {Animation} animation
     * @param {Player} player
     */
    constructor(enemy, animation, player) {
        super();

        this.enemy = enemy;
        this.animation = animation;
        this.player = player;
    }

    enter() {
        this.enemy.currentAnimation = this.animation[this.enemy.direction];
    }

    update(dt) {
        this.move(dt);
    }

    move(dt) {
        if (this.enemy.position.x > this.player.position.x) {
            this.enemy.direction = Direction.Left;
            this.enemy.isFacingLeft = true;
            
            this.enemy.position.x -= this.enemy.speed * dt;

        } else if (this.enemy.position.x < this.player.position.x) {
            this.enemy.direction = Direction.Right;
            this.enemy.isFacingLeft = false;

            this.enemy.position.x += this.enemy.speed * dt;
        }

        if (this.enemy.position.y > this.player.position.y) {
            this.enemy.position.y -= this.enemy.speed * dt;

        } else if (this.enemy.position.y < this.player.position.y) {
            this.enemy.position.y += this.enemy.speed * dt;
        }
    }
}