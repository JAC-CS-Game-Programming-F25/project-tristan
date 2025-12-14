import Player from "../entities/Player.js";
import Colour from "../enums/Colour.js";
import { timer, context, CANVAS_WIDTH, CANVAS_HEIGHT } from "../globals.js";
import HealthBar from "../user-interface/bars/HealthBar.js";

export default class UserInterface {
    /**
     * 
     * @param {Player} player
     */
    constructor(player) {
        this.player = player;

        this.healthBar = new HealthBar(3, 3, this.player);

        this.maxTime = 10;
        this.time = this.maxTime;

        timer.addTask(() => {
            this.time--;
        }, 2)
    }

    render() {
        context.save();
        
        context.textBaseline = 'top';
        context.textAlign = 'right';
        context.font = '18px aria';
        context.fillStyle = Colour.White;
        context.fillText(this.time, CANVAS_WIDTH - 10, 0);

        context.restore();
        context.save();

        this.healthBar.render();

        context.restore();
    }
}