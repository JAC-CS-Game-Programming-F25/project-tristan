import Colour from "../../enums/Colour.js";
import Bar from "./Bar.js";
import { context } from "../../globals.js";
import Vector from "../../../lib/Vector.js";

export default class HealthBar extends Bar {
    constructor(x, y, entity) {
		// Color of the starting health bar is lime
		super(x, y, entity, Colour.Lime);

		// The radius for the corner of the rectangle that displays the health
		// Basically, makes it so that the right corners are rounded if the
		// health is full, else, it will have a straight bar ending.
		this.roundCorner = (this.entity.health < this.entity.totalHealth) ? 0 : 50;

		this.halfLife = this.entity.totalHealth / 2;
		this.halfLifeColour = Colour.Yellow;

		this.quarterLife = this.entity.totalHealth / 4;
		this.quarterLifeColour = Colour.Red;

		this.originalWidth = Bar.WIDTH;
		this.originalHeight = Bar.HEIGHT;
    }

    render() {
        context.save();

        super.render();

		if (!this.forEnemy) {
			context.translate(Bar.WIDTH + 5, 0);
			context.textBaseline = 'top';
			context.fillStyle = Colour.White;
			context.font = '18px aria' //Font family TODOOOOOOOOOOOOOOOOOOOOO
			context.fillText(this.entity.health + " / " + this.entity.totalHealth, 0, 0)
		}
		
		Bar.WIDTH = this.originalWidth;
		Bar.HEIGHT = this.originalHeight;

        context.restore();
    }

    update() {
		super.update();

		if (this.forEnemy) {
			Bar.WIDTH = 24;
			Bar.HEIGHT = 3;

			this.originalBarSize = Bar.WIDTH - Bar.INNER_BAR_OFFSET;
			this.barSize = Bar.WIDTH - Bar.INNER_BAR_OFFSET;

			this.position = new Vector(this.entity.position.x, this.entity.position.y);
		}

        this.roundCorner = (this.entity.health < this.entity.totalHealth) ? 0 : 50;

		// Change the colour of the bar depending on how low on life the player is
		if (this.entity.health <= this.quarterLife) {
			this.barColour = this.quarterLifeColour;
		} else if (this.entity.health <= this.halfLife) {
			this.barColour = this.halfLifeColour;
		} else {
			this.barColour = Colour.Lime;
		}

		this.barSize = this.originalBarSize / (this.entity.totalHealth / this.entity.health)
    }
}