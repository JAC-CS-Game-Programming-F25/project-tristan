import Sprite from "../../lib/Sprite.js";
import { images } from "../globals.js";
import Tile from "../objects/Tile.js";
import ImageName from "../enums/ImageName.js";
import EnemyType from "../enums/EnemyType.js";
import GreenDino from "../entities/enemies/GreenDino.js";
import RedDino from "../entities/enemies/RedDino.js";

export default class EnemyFactory {
    static GREEN_DINO_SPRITES = "";

    static RED_DINO_SPRITES = "";

    /**
	 * @param {string} type A string using the EnemyType enum.
	 * @returns An instance of an enemy specified by EnemyType.
	 */
    static createInstance(type, player, round) {
        EnemyFactory.GREEN_DINO_SPRITES = Sprite.generateSpritesFromSpriteSheet(
            images.get(ImageName.DinoGreen),
            (Tile.TILE_SIZE + 8),
            (Tile.TILE_SIZE + 8)
        );

        EnemyFactory.RED_DINO_SPRITES = Sprite.generateSpritesFromSpriteSheet(
            images.get(ImageName.DinoRed),
            (Tile.TILE_SIZE + 8),
            (Tile.TILE_SIZE + 8)
        );

        switch (type) {
            case EnemyType.DinoGreen:
                return new GreenDino(EnemyFactory.GREEN_DINO_SPRITES, player, round);
            
            case EnemyType.DinoRed:
                return new RedDino(EnemyFactory.RED_DINO_SPRITES, player, round);
        }
    }
}