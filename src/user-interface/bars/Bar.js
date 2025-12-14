import Vector from "../../../lib/Vector.js";
import Player from "../../entities/Player.js";
import Colour from "../../enums/Colour.js";
import { context } from "../../globals.js";

export default class Bar {
    static WIDTH = 140;
    static HEIGHT = 10;
    
    // Offset for the bar that has actual meaning, as in, the coloured bar,
    // because the outer bar is only black
    static INNER_BAR_OFFSET = 2;

	/**
     * 
     * @param {number} x Horizontal position on the canvas
     * @param {number} y Vertical position on the canvas
     * @param {Player} player The player who has this bar
	 * @param {Colour} colour The colour of the inner bar
     */
    constructor(x, y, player, colour) {
        this.position = new Vector(x, y);

        this.player = player;
        
        // Original size of the inner bar
        this.originalBarSize = Bar.WIDTH - Bar.INNER_BAR_OFFSET * 2;

		// The size of the bar that will change depending on the class
        // that inherits.
        this.barSize = this.originalBarSize;

        // This will change depending on the class that inherits.
        this.roundCorner = 50;

        // Colour of the inner bar
        this.barColour = colour;
    }

    render() {
        this.update();

        context.strokeStyle = Colour.Black;
		context.beginPath();
		// The black rectangle surrounding the inner bar.
		context.roundRect(
			this.position.x,
			this.position.y,
			Bar.WIDTH,
			Bar.HEIGHT,
			50
		);
		context.stroke();

		context.strokeStyle = this.barColour;
		context.fillStyle = this.barColour;
		context.beginPath();
		// The rectangle that changes based on what classes that inherit want.
		context.roundRect(
			this.position.x + 2,
			this.position.y + 2,
			this.barSize,
			6,
			[50, this.roundCorner, this.roundCorner, 50]
		);
		context.fill();
		context.stroke();
    }

    // Function that will be overridden by class that inherit.
    update() { }
}