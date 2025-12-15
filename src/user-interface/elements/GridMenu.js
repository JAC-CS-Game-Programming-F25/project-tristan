import GridSelection from "./GridSelection.js";
import Panel from "./Panel.js";

export default class GridMenu extends Panel {
    static BATTLE_MOVE_GRID_MENU = {
        x: Panel.BOTTOM_DIALOGUE.x,
        y: Panel.BOTTOM_DIALOGUE.y,
        width: Panel.BOTTOM_DIALOGUE.width,
        height: Panel.BOTTOM_DIALOGUE.height
    };

    constructor(x, y, width, height, items) {
        super(x, y, width, height, items);

        this.grid = new GridSelection(x, y, width, height, items);
    }

    update() {
        this.grid.update();
    }

    render() {
        super.render();
        this.grid.render();
    }
}