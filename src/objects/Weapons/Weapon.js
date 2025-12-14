import GameObject from "../GameObject.js";
import Tile from "../../objects/Tile.js";
import Sprite from "../../../lib/Sprite.js";
import Player from "../../entities/Player.js";
import { images } from "../../globals.js";
import ImageName from "../../enums/ImageName.js";
import Vector from "../../../lib/Vector.js";

export default class Weapon extends GameObject {
    static WIDTH = Tile.TILE_SIZE;
    static HEIGHT = Tile.TILE_SIZE;

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

        this.damage = 1;

        this.isAttacking = false;
	}

    update(dt) {
        super.update(dt);

		if (!this.isAttacking) {
			this.position = new Vector(this.player.position.x + Tile.TILE_SIZE, this.player.position.y - Tile.TILE_SIZE);
		}
    }
}