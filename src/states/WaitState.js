import GameStateName from "../enums/GameStateName.js";
import { stateMachine } from "../globals.js";
import PlayState from "./PlayState.js";

export default class WaitState extends PlayState {
    constructor(round) {
        super(round);
    }

    enter(round) {
        this.round = round;

        this.userInterface.round = this.round;
    }

    update(dt) {
        super.update(dt);

        if (this.userInterface.time <= 0) {
            stateMachine.change(GameStateName.Play)
        }
    }


}