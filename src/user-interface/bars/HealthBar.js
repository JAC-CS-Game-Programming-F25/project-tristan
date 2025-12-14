import Colour from "../../enums/Colour.js";
import Bar from "./Bar.js";
import { context } from "../../globals.js";

export default class HealthBar extends Bar {
    constructor(x, y, player) {
		// Color of the starting health bar is lime
		super(x, y, player, Colour.Lime);

		// The radius for the corner of the rectangle that displays the health
		// Basically, makes it so that the right corners are rounded if the
		// health is full, else, it will have a straight bar ending.
		this.roundCorner = (this.player.health < this.player.totalHealth) ? 0 : 50;

		this.halfLife = this.player.totalHealth / 2;
		this.halfLifeColour = Colour.Yellow;

		this.quarterLife = this.player.totalHealth / 4;
		this.quarterLifeColour = Colour.Red;
    }

    render() {
        context.save();

        super.render();

        context.translate(Bar.WIDTH + 5, 0);
        context.textBaseline = 'top';
        context.fillStyle = Colour.White;
        context.font = '18px aria' //Font family TODOOOOOOOOOOOOOOOOOOOOO
        context.fillText(this.player.health + " / " + this.player.totalHealth, 0, 0)

        context.restore();
    }

    update() {
		super.update();

        this.roundCorner = (this.player.health < this.player.totalHealth) ? 0 : 50;

		// Change the colour of the bar depending on how low on life the player is
		if (this.player.health <= this.quarterLife) {
			this.barColour = this.quarterLifeColour;
		} else if (this.player.health <= this.halfLife) {
			this.barColour = this.halfLifeColour;
		}

		this.barSize = this.originalBarSize / (this.player.totalHealth / this.player.health)
    }
}