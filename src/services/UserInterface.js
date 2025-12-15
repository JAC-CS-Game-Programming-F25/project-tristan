import Player from "../entities/Player.js";
import Colour from "../enums/Colour.js";
import { timer, context, CANVAS_WIDTH, CANVAS_HEIGHT } from "../globals.js";
import HealthBar from "../user-interface/bars/HealthBar.js";

export default class UserInterface {
    /**
     * 
     * @param {Player} player
     */
    constructor(player, round) {
        this.player = player;

        this.healthBar = new HealthBar(3, 3, this.player);

        this.maxTime = 5;
        this.time = this.maxTime;

        timer.addTask(() => {
            this.time--;
        }, 2);

        this.round = round;
    }

    render() {
        context.save();
        
        context.textBaseline = 'top';
        context.textAlign = 'right';
        context.font = '18px VT323';
        context.fillStyle = Colour.White;

        context.fillText("Round " + this.round, CANVAS_WIDTH / 2 + 100, 0)

        context.fillText(this.time, CANVAS_WIDTH - 10, 0);

        context.textBaseline = 'bottom';
        context.textAlign = 'left';
        context.fillText("Points: " + this.player.points, 10, CANVAS_HEIGHT);

        context.restore();
        context.save();

        this.healthBar.render();

        context.restore();
    }
}