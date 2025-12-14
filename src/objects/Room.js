import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from "../globals.js";
import Tile from "./Tile.js";
import ImageName from '../enums/ImageName.js';
import EnemyType from '../enums/EnemyType.js';
import { pickRandomElement } from "../../lib/Random.js";
import EnemyFactory from "../services/EnemyFactory.js";
import Player from "../entities/Player.js";
import Enemy from "../entities/enemies/Enemy.js";
import GameEntity from "../entities/GameEntity.js";

export default class Room {
    static WIDTH = CANVAS_WIDTH / Tile.TILE_SIZE - 2;
    static HEIGHT = Math.floor(CANVAS_HEIGHT / Tile.TILE_SIZE) - 2;
    static RENDER_OFFSET_X = (CANVAS_WIDTH - Room.WIDTH * Tile.TILE_SIZE) / 2;
	static RENDER_OFFSET_Y = (CANVAS_HEIGHT - Room.HEIGHT * Tile.TILE_SIZE) / 2;

	static TOP_EDGE = Room.RENDER_OFFSET_Y + Tile.TILE_SIZE + 5;
	static BOTTOM_EDGE =
		CANVAS_HEIGHT - Room.RENDER_OFFSET_Y - Tile.TILE_SIZE - 1;
	static LEFT_EDGE = Room.RENDER_OFFSET_X + Tile.TILE_SIZE - 2;
	static RIGHT_EDGE = CANVAS_WIDTH - Tile.TILE_SIZE * 2 + 3;
	static CENTER_X = Math.floor(
		Room.LEFT_EDGE + (Room.RIGHT_EDGE - Room.LEFT_EDGE) / 2
	);
	static CENTER_Y = Math.floor(
		Room.TOP_EDGE + (Room.BOTTOM_EDGE - Room.TOP_EDGE) / 2
	);

    static TILE_TOP_LEFT_CORNER = 0;
    static TILE_INNER_TOP_LEFT_CORNER = 11;

    static TILE_TOP_RIGHT_CORNER = 5;
    static TILE_INNER_TOP_RIGHT_CORNER = 14;

    static TILE_BOTTOM_LEFT_CORNER = 40;
    static TILE_INNER_BOTTOM_LEFT_CORNER = 31;

    static TILE_BOTTOM_RIGHT_CORNER = 45;
    static TILE_INNER_BOTTOM_RIGHT_CORNER = 34;

    static TILE_EMPTY = 78;
    static TILE_TOP_WALLS = [1, 2, 3, 4];
    static TILE_INNER_TOP_FLOORS = [12, 13];

    static TILE_BOTTOM_WALLS = [41, 42, 43, 44];
    static TILE_INNER_BOTTOM_FLOORS = [32, 33];

    static TILE_LEFT_WALLS = [10, 20, 30];
    static TILE_INNER_LEFT_FLOOR = 21;

    static TILE_RIGHT_WALLS = [15, 25, 35];
    static TILE_INNER_RIGHT_FLOOR = 24;

    static TILE_FLOORS = [
        6, 7, 8, 9, 16, 17, 18, 19, 26, 27, 28, 29
    ]

	/**
	 * 
	 * @param {Player} player 
	 */
    constructor(player) {
        this.player = player;
        this.dimensions = new Vector(Room.WIDTH, Room.HEIGHT);

        this.sprites = Sprite.generateSpritesFromSpriteSheet(
            images.get(ImageName.Tiles),
            Tile.TILE_SIZE,
            Tile.TILE_SIZE
        );

        this.tiles = this.generateWallsAndFloors();

        // Generate entities at the start of a wave
        this.entities = this.generateEntities();

        // Will be filled with cash for player to pick up whenever they kill enemies
        this.objects = [];

        //this.renderQueue = this.buildRenderQueue();

        this.adjacentOffset = new Vector();
    }

    update(dt) {
        this.renderQueue = this.buildRenderQueue();

        this.cleanUpEntities();
        this.updateEntities(dt);

        this.cleanUpObjects();

        this.updateObjects(dt);
    }

    render() {
        this.renderTiles();

        this.renderQueue.forEach((elementToRender) => {
			elementToRender.render(this.adjacentOffset);
		});
    }

    // Code copied from Zelda
    generateWallsAndFloors() {
        const tiles = new Array();

        for (let y = 0; y < this.dimensions.y; y++) {
            tiles.push([]);

            for (let x = 0; x < this.dimensions.x; x++) {
                let tileId = Room.TILE_EMPTY;

                if (x === 0 && y === 0) {
					tileId = Room.TILE_TOP_LEFT_CORNER;
                } else if (x === 1 && y === 1) {
                    tileId = Room.TILE_INNER_TOP_LEFT_CORNER;

				} else if (x === 0 && y === this.dimensions.y - 1) {
					tileId = Room.TILE_BOTTOM_LEFT_CORNER;
                } else if (x === 1 && y === this.dimensions.y - 2) {
                    tileId = Room.TILE_INNER_BOTTOM_LEFT_CORNER;
                
				} else if (x === this.dimensions.x - 1 && y === 0) {
					tileId = Room.TILE_TOP_RIGHT_CORNER;
                } else if (x === this.dimensions.x - 2 && y === 1) {
                    tileId = Room.TILE_INNER_TOP_RIGHT_CORNER;

				} else if (
					x === this.dimensions.x - 1 &&
					y === this.dimensions.y - 1
				) {
					tileId = Room.TILE_BOTTOM_RIGHT_CORNER;
                } else if (
					x === this.dimensions.x - 2 &&
					y === this.dimensions.y - 2
				) {
                    tileId = Room.TILE_INNER_BOTTOM_RIGHT_CORNER;

				}
                else if (x === 0) {
					tileId =
						Room.TILE_LEFT_WALLS[
							Math.floor(
								Math.random() * Room.TILE_LEFT_WALLS.length
							)
						];
                } else if (x === 1 && y !== 0 && y !== this.dimensions.y - 1) {
                    tileId = Room.TILE_INNER_LEFT_FLOOR;
				
				} else if (x === this.dimensions.x - 1) {
					tileId =
						Room.TILE_RIGHT_WALLS[
							Math.floor(
								Math.random() * Room.TILE_RIGHT_WALLS.length
							)
						];
                } else if (x === this.dimensions.x - 2 && y !== 0 && y !== this.dimensions.y - 1) {
                    tileId = Room.TILE_INNER_RIGHT_FLOOR;
					
				} else if (y === 0) {
					tileId =
						Room.TILE_TOP_WALLS[
							Math.floor(
								Math.random() * Room.TILE_TOP_WALLS.length
							)
						];
                } else if ( y === 1) {
                    tileId = Room.TILE_INNER_TOP_FLOORS[
                        Math.floor(
                            Math.random() * Room.TILE_INNER_TOP_FLOORS.length
                        )
                    ]
					
				} else if (y === this.dimensions.y - 1) {
					tileId =
						Room.TILE_BOTTOM_WALLS[
							Math.floor(
								Math.random() *
									Room.TILE_BOTTOM_WALLS.length
							)
						];
                } else if (y === this.dimensions.y - 2) {
                    tileId = Room.TILE_INNER_BOTTOM_FLOORS[
                        Math.floor(
                            Math.random() * Room.TILE_INNER_BOTTOM_FLOORS.length
                        )
                    ]
					
				} else {
					tileId =
						Room.TILE_FLOORS[
							Math.floor(Math.random() * Room.TILE_FLOORS.length)
						];
				}

				tiles[y].push(
					new Tile(
						x,
						y,
						Room.RENDER_OFFSET_X,
						Room.RENDER_OFFSET_Y,
						this.sprites[tileId]
					)
				);
            }
        }

        return tiles;
    }

	generateEntities() {
		const entities = new Array();

		for (let i = 0; i < 5; i++) {
			entities.push(EnemyFactory.createInstance(EnemyType[pickRandomElement(Object.keys(EnemyType))], this.player));
		}

		entities.push(this.player);

		return entities;
	}

    buildRenderQueue() {
		return [...this.entities, ...this.objects].sort((a, b) => {
			let order = 0;
			const bottomA = a.hitbox.position.y + a.hitbox.dimensions.y;
			const bottomB = b.hitbox.position.y + b.hitbox.dimensions.y;
			
			if (a.renderPriority < b.renderPriority) {
				order = -1;
			} else if (a.renderPriority > b.renderPriority) {
				order = 1;
			} else if (bottomA < bottomB) {
				order = -1;
			} else {
				order = 1;
			}

			return order;
		});
	}

    cleanUpEntities() {
        this.entities = this.entities.filter((entity) => !entity.isDead);
    }

    updateEntities(dt) {
		this.entities.forEach((entity) => {
			if (entity.health <= 0) {
				// If the entity that died is an enemy, spawn some cash TODOOOOOOOOOOOOOOOO
				// if (entity instanceof Enemy) {
				// 	// Get a 1 to 100 random number
				// 	var chance = getRandomPositiveInteger(1, 100)

				// 	// If it is within HEART_SPAWN_CHANCE%
				// 	if (chance <= Room.HEART_SPAWN_CHANCE) {
				// 		// Create a heart at the enemy's dead position
				// 		this.objects.push(
				// 			new Heart(
				// 				new Vector(Heart.WIDTH, Heart.HEIGHT),
				// 				new Vector(
				// 					entity.position.x,
				// 					entity.position.y
				// 				),
				// 				this.player
				// 			)
				// 		);
				// 	}
				// }

				entity.isDead = true;
			}

			entity.update(dt);

            // Update objects that collided with this entity
            this.objects.forEach((object) => {
				if (object.didCollideWithEntity(entity.hitbox)) {
					if (object.isCollidable) {
						object.onCollision(entity);
					}

					if (object.isConsumable) {
						object.onConsume(entity);
					}
				}
			});

			// Since the player is technically always colliding with itself, skip it.
			if (entity instanceof Player) {
				entity.weapons.forEach((weapon) => {
					if (weapon.readyForNewEnemy() && this.entities.filter((entity2) => entity2 instanceof Enemy).length !== 0) {
						weapon.attackEnemy(
							this.getClosestEnemyToPlayer()
						);
					}
				});

				return;
			}

			if (
				!entity.isDead &&
				this.player.didCollideWithEntity(entity.hitbox) &&
				!this.player.isInvulnerable
			) {
				this.player.receiveDamage(entity.damage);
				this.player.becomeInvulnerable();
			}
		});
	}

    cleanUpObjects() {
		this.objects = this.objects.filter((object) => !object.wasConsumed);
	}

	updateObjects(dt) {
		this.objects.forEach((object) => {
			object.update(dt);
		});
	}

    renderTiles() {
		this.tiles.forEach((tileRow) => {
			tileRow.forEach((tile) => {
				tile.render(this.adjacentOffset);
			});
		});
	}

	getClosestEnemyToPlayer() {
		var enemies = this.entities.filter((entity) => entity instanceof Enemy)

		var closestEnemy = enemies[0];

		enemies.forEach((enemy) => {
			closestEnemy = this.getCloserEnemy(closestEnemy, enemy, this.player);
		});

		return closestEnemy;
	}

	/**
	 * 
	 * @param {Enemy} enemy1 
	 * @param {Enemy} enemy2 
	 * @param {GameEntity} target 
	 */
	getCloserEnemy(enemy1, enemy2, target) {
		var distance1 = Math.abs(enemy1.position.x - target.position.x) + Math.abs(enemy1.position.y - target.position.y)
		var distance2 = Math.abs(enemy2.position.x - target.position.x) + Math.abs(enemy2.position.y - target.position.y)

		if (distance1 < distance2) {
			return enemy1;
		} else {
			return enemy2;
		}
	}
}