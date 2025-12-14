import GameObject from "../GameObject.js";
import Tile from "../../objects/Tile.js";
import Sprite from "../../../lib/Sprite.js";
import Player from "../../entities/Player.js";
import { images, timer } from "../../globals.js";
import ImageName from "../../enums/ImageName.js";
import Vector from "../../../lib/Vector.js";
import Enemy from "../../entities/enemies/Enemy.js";
import { isAABBCollision } from "../../../lib/Collision.js";

export default class Weapon extends GameObject {
    static WIDTH = Tile.TILE_SIZE;
    static HEIGHT = Tile.TILE_SIZE;

    static SPEED = 100;

    /**
     * 
	 * @param {Vector} dimensions
	 * @param {Vector} position
     * @param {Player} player
     */
    constructor(dimensions, position, player) {
		super(dimensions, position);

		this.isConsumable = true;

		this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Icons),
			Weapon.WIDTH,
			Weapon.HEIGHT
		);

        // This is just to get overridden in classes that inherit.
        this.currentFrame = 0;

		this.player = player;

        this.range = Tile.TILE_SIZE;

        this.cooldown = 1;
        this.currentCooldown = 0;

        this.damage = 1;

        this.isAttacking = false;

        this.enemyToAttack = "";

        this.speed = Weapon.SPEED;

        this.hitEnemy = false;

        this.weaponNumber = 0;
        
        timer.addTask(() => { this.currentCooldown--}, 2);
	}

    update(dt) {
        super.update(dt);

		if (!this.isAttacking) {
			this.position = new Vector(
                this.player.position.x + this.getXWeaponModifier(this.weaponNumber), 
                this.player.position.y + this.getYWeaponModifier(this.weaponNumber)
            );
		}   
        else {
            if (this.currentCooldown <= 0) {
                if (!this.hitEnemy) {
                    this.goTowardsEnemy(dt);
                }
                else {
                    this.comeBack(dt);
                }
            }
        }
    }

    /**
     * 
     * @param {Enemy} enemy The closest enemy to the player
     */
    attackEnemy(enemy) {
        if (
            // Check if the enemy is within range
            isAABBCollision(
                this.player.position.x - this.range,
                this.player.position.y - this.range,
                this.range * 2,
                this.range * 2,
                enemy.hitbox.position.x,
                enemy.hitbox.position.y,
                enemy.hitbox.dimensions.x,
                enemy.hitbox.dimensions.y,
            )
        ) {
            this.isAttacking = true;
            this.enemyToAttack = enemy;
        }
    }

    goTowardsEnemy(dt) {
        if (isAABBCollision(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.dimensions.x,
            this.hitbox.dimensions.y,
            this.enemyToAttack.hitbox.position.x,
            this.enemyToAttack.hitbox.position.y,
            this.enemyToAttack.hitbox.dimensions.x,
            this.enemyToAttack.hitbox.dimensions.y,
        )) {
            this.hitEnemy = true;

            return;
        }

        if (this.position.x > this.enemyToAttack.position.x) {
            this.position.x -= this.speed * dt;

        } else if (this.position.x < this.enemyToAttack.position.x) {
            this.position.x += this.speed * dt;
        }

        if (this.position.y > this.enemyToAttack.position.y) {
            this.position.y -= this.speed * dt;

        } else if (this.position.y < this.enemyToAttack.position.y) {
            this.position.y += this.speed * dt;
        }
    }

    comeBack(dt) {
        if (isAABBCollision(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.dimensions.x,
            this.hitbox.dimensions.y,
            this.player.hitbox.position.x + this.getXWeaponModifier(this.weaponNumber),
            this.player.hitbox.position.y + this.getYWeaponModifier(this.weaponNumber),
            this.hitbox.dimensions.x,
            this.hitbox.dimensions.y,
        )) {
            this.hitEnemy = false;
            this.currentCooldown = this.cooldown;
            this.isAttacking = false;

            return;
        }

        if (this.enemyToAttack !== "") {
            this.enemyToAttack = "";
        }

        if (this.position.x > this.player.position.x + this.getXWeaponModifier(this.weaponNumber)) {
            this.position.x -= this.speed * dt;

        } else if (this.position.x < this.player.position.x + this.getXWeaponModifier(this.weaponNumber)) {
            this.position.x += this.speed * dt;
        }

        if (this.position.y > this.player.position.y + this.getYWeaponModifier(this.weaponNumber)) {
            this.position.y -= this.speed * dt;
            
        } else if (this.position.y < this.player.position.y + this.getYWeaponModifier(this.weaponNumber)) {
            this.position.y += this.speed * dt;
        }
    }

    getXWeaponModifier(weaponNumber) {
        switch(weaponNumber) {
            case 0:
            case 1:
            case 2:
                return Tile.TILE_SIZE;
            
            case 3:
            case 4:
            case 5:
                return -Tile.TILE_SIZE;

        }
    }

    getYWeaponModifier(weaponNumber) {
        switch(weaponNumber) {
            case 0:
            case 3:
                return -Tile.TILE_SIZE;
            
            case 1:
            case 4:
                return 0;

            case 2:
            case 5:
                return Tile.TILE_SIZE;
        }
    }

    readyForNewEnemy() {
        return this.enemyToAttack === "" && !this.hitEnemy && this.currentCooldown <= 0;
    }
}