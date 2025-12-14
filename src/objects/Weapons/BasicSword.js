import Vector from "../../../lib/Vector.js";
import Player from "../../entities/Player.js";
import Tile from "../Tile.js";
import Weapon from "./Weapon.js";

export default class BasicSword extends Weapon {
    static FRAME = 154

    /**
     * 
	 * @param {Vector} position
     * @param {Player} player
     */
    constructor(position, player) {
		super(new Vector(Tile.TILE_SIZE, Tile.TILE_SIZE), position, player);

        this.currentFrame = BasicSword.FRAME;

        this.range = 4 * Tile.TILE_SIZE;

        this.cooldown = 1;

        this.damage = 1;
    }
}