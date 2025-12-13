import GameEntity from './GameEntity.js';
import Sprite from '../../lib/Sprite.js';
import { context, images, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js';
import Hitbox from '../../lib/Hitbox.js';
import Room from '../objects/Room.js';
import StateMachine from '../../lib/StateMachine.js';
import PlayerStateName from '../enums/PlayerStateName.js';
import PlayerWalkingState from '../states/entity/player/PlayerWalkingState.js';
import PlayerIdlingState from '../states/entity/player/PlayerIdlingState.js';

export default class Player extends GameEntity {
    static WIDTH = 16;
    static HEIGHT = 16;
    static INVULNERABLE_DURATION = 1.5;
    static INVULNERABLE_FLASH_INTERVAL = 0.1;
    static MAX_SPEED = 75;

    constructor() {
        super();

        this.totalHealth = 6;

        this.walkingSprites = Sprite.generateSpritesFromSpriteSheet(
            images.get( ImageName.PlayerWalk ),
            Player.WIDTH,
            Player.HEIGHT
        );

        this.idlingSprites = Sprite.generateSpritesFromSpriteSheet(
            images.get( ImageName.PlayerIdle ),
            Player.WIDTH,
            Player.HEIGHT
        );

        this.sprites = this.idlingSprites;

        this.hitboxOffsets = new Hitbox(
            4,
            Player.HEIGHT - 4,
            -9,
            -Player.HEIGHT + 4
        );

        this.position.x = Room.CENTER_X - Player.WIDTH / 2;
        this.position.y = Room.CENTER_Y - Player.HEIGHT / 2;

        this.dimensions.x = Player.WIDTH;
        this.dimensions.y = Player.HEIGHT;

        this.speed = Player.MAX_SPEED;

        this.health = this.totalHealth;

        this.isInvulnerable = false;
        this.alpha = 1;
        this.invulnerabilityTimer = null;

        this.stateMachine = this.initializeStateMachine();
    }
    
    render() {
        context.save();

        context.globalAlpha = this.alpha;

        super.render();

        context.restore();

        // console.log("Frame: " + this.currentAnimation.getCurrentFrame())
    }

    initializeStateMachine() {
        const stateMachine = new StateMachine();

        stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));

        stateMachine.add(PlayerStateName.Idle, new PlayerIdlingState(this));

        stateMachine.change(PlayerStateName.Idle);

        return stateMachine;
    }

    receiveDamage(damage) {
		this.health -= damage;
		//sounds.play(SoundName.HitPlayer);
	}

	heal(health) {
		this.health = Math.min(this.totalHealth, this.health + health);
	}

    becomeInvulnerable() {
		this.isInvulnerable = true;
		this.invulnerabilityTimer = this.startInvulnerabilityTimer();
	}

	startInvulnerabilityTimer() {
		const action = () => {
			this.alpha = this.alpha === 1 ? 0.5 : 1;
		};
		const interval = Player.INVULNERABLE_FLASH_INTERVAL;
		const duration = Player.INVULNERABLE_DURATION;
		const callback = () => {
			this.alpha = 1;
			this.isInvulnerable = false;
		};

		return timer.addTask(action, interval, duration, callback);
	}
}