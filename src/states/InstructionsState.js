import State from "../../lib/State.js";
import { CANVAS_WIDTH, context, input, stateStack } from "../globals.js";
import PlayState from "./PlayState.js";
import TransitionState from "./TransitionState.js";
import Input from "../../lib/Input.js";

export default class InstructionsState extends State {
    constructor() {
        super();

        this.playState = new PlayState;
    }

    update() {
        if (input.isKeyPressed(Input.KEYS.ENTER)) {
            TransitionState.fade(() => {
                stateStack.pop();
                stateStack.push(this.playState);
            })
        }
    }

    render() {
        context.save();

        context.font = "20px VT323";
        context.fillStyle = "grey";
        context.fillText(
            "Welcome to Protato!",
            CANVAS_WIDTH / 2 - 70,
            15
        )

        context.font = "15px VT323";
        context.fillText( "In this game, your goal is to reach round 10. Simple, right?", CANVAS_WIDTH / 2 - 180, 30);
        context.fillText( "To do so, all you need to do is run around,", CANVAS_WIDTH / 2 - 120, 50);
        context.fillText( "since you will have swords that will deal with all the enemies.", CANVAS_WIDTH / 2 - 190, 65);
        context.fillText( "You will gain points for every enemy you kill.", CANVAS_WIDTH / 2 - 130, 90);
        context.fillText( "After you kill all mobs or time runs out, there will be a shop", CANVAS_WIDTH / 2 - 185, 115);
        context.fillText( "where you can spend your points.", CANVAS_WIDTH / 2 - 90, 130);
        context.fillText( "Enemies will gradually get stronger, so be careful, but", CANVAS_WIDTH / 2 - 170, 155);
        context.fillText( "more importantly, HAVE FUN!", CANVAS_WIDTH / 2 - 80, 170);
        context.fillText( "Press Enter to Play", CANVAS_WIDTH / 2 - 50, 200);

        context.restore();
    }
}