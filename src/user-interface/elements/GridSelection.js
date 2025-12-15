import Vector from "../../../lib/Vector.js";
import UserInterfaceElement from "../UserInterfaceElement.js";
import SoundName from "../../enums/SoundName.js";
import Input from "../../../lib/Input.js";
import { context, input, sounds } from '../../globals.js';

export default class GridSelection extends UserInterfaceElement {
    constructor(x, y, width, height, items) {
        super(x, y, width, height);

        this.gapHeight = this.dimensions.y / (items.length / 2) / 2;
        this.gapWidth = this.dimensions.x / (items.length / 2);

        this.items = this.initializeItems(items);

        this.currentSelection = 0;

        this.font = this.initializeFont();
    }

    initializeItems(items) {
        // Each item has different positions, so I just hardcode 
        // instead of looping through
        items[0].position = new Vector(
            this.position.x + this.gapHeight * 4,
            this.position.y + this.gapHeight
        );

        items[1].position = new Vector(
            this.position.x + this.gapWidth + this.gapHeight * 2,
            this.position.y + this.gapHeight
        );

        items[2].position = new Vector(
            this.position.x + this.gapHeight * 4,
            this.position.y + this.gapHeight * 3
        );

        items[3].position = new Vector(
            this.position.x + this.gapWidth + this.gapHeight * 2,
            this.position.y + this.gapHeight * 3
        );

        return items
    }

    initializeFont() {
        return `${Math.min(UserInterfaceElement.FONT_SIZE, this.gapHeight)}px aria`;
    }

    update() {
        if (
            input.isKeyPressed(Input.KEYS.W) ||
            input.isKeyPressed(Input.KEYS.ARROW_UP)
        ) {
            this.navigateUp();
        } else if (
            input.isKeyPressed(Input.KEYS.S) ||
            input.isKeyPressed(Input.KEYS.ARROW_DOWN)
        ) {
            this.navigateDown();
        } else if (
            input.isKeyPressed(Input.KEYS.A) ||
            input.isKeyPressed(Input.KEYS.ARROW_LEFT)
        ) {
            this.navigateLeft();
        } else if (
            input.isKeyPressed(Input.KEYS.D) ||
            input.isKeyPressed(Input.KEYS.ARROW_RIGHT)
        ) {
            this.navigateRight();
        } else if (
            input.isKeyPressed(Input.KEYS.ENTER) ||
            input.isKeyPressed(Input.KEYS.SPACE)
        ) {
            this.select();
        }
    }

    render() {
        this.items.forEach((item, index) => {
            this.renderSelectionItem(item, index);
        });
    }

    renderSelectionItem(item, index) {
        if (index === this.currentSelection) {
            this.renderSelectionArrow(item);
        }
        
        context.save();
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = this.font;
		context.fillText(item.text, item.position.x, item.position.y);
		context.restore();
    }

    renderSelectionArrow(item) {
		context.save();
		context.translate(item.position.x - 40, item.position.y - 5);
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(6, 5);
		context.lineTo(0, 10);
		context.closePath();
		context.fill();
		context.restore();
	}

    // I realize that navigateUp and navigateDown do the same thing, 
    // but that is only the case in a 2x2 grid. 
    // I will keep them both in case I want to make the grid expandable
    // later.
    navigateUp() {
        sounds.play(SoundName.SelectionMove);

		if (this.currentSelection < 2) {
			this.currentSelection += 2;
		} else {
			this.currentSelection -= 2;
		}
    }

    navigateDown() {
		sounds.play(SoundName.SelectionMove);

		if (this.currentSelection < 2) {
			this.currentSelection += 2;
		} else {
			this.currentSelection -= 2;
		}
	}

    // I realize that navigateLeft and navigateRight do the same thing, 
    // but that is only the case in a 2x2 grid. 
    // I will keep them both in case I want to make the grid expandable
    // later.
    navigateLeft() {
        sounds.play(SoundName.SelectionMove);

		if (this.currentSelection % 2 === 0) {
			this.currentSelection += 1;
		} else {
			this.currentSelection -= 1;
		}
    }

    navigateRight() {
        sounds.play(SoundName.SelectionMove);

        if (this.currentSelection % 2 === 0) {
            this.currentSelection += 1;
        } else {
            this.currentSelection -= 1;
        }
    }

    select() {
        sounds.play(SoundName.SelectionChoice);

        this.items[this.currentSelection].onSelect();
    }
}