import State from "../../lib/State.js";
import Player from "../entities/Player.js";
import { stateStack } from "../globals.js";
import BasicSword from "../objects/Weapons/BasicSword.js";
import GridMenu from "../user-interface/elements/GridMenu.js";
import Vector from "../../lib/Vector.js";
import Tile from "../objects/Tile.js";
import Weapon from "../objects/Weapons/Weapon.js";

export default class ShopState extends State {

    /**
     * 
     * @param {Player} player 
     */
    constructor(player) {
        super();

        this.player = player;

        const defaultOption = { text: "-", onSelect: () => { stateStack.pop();} };

        const shopItems = [
            { text: "HP-UP - 25 Points", onSelect: () => this.HpUp() },
            { text: "ATK-UP - 50 Points", onSelect: () => this.AtkUp() },
            this.player.weapons.length < 6 ? { text: "SWRD++ - 100 Points", onSelect: () => this.AddSword() } : defaultOption,
            defaultOption,
        ];

        this.gridMenu = new GridMenu(
            GridMenu.BATTLE_MOVE_GRID_MENU.x,
            GridMenu.BATTLE_MOVE_GRID_MENU.y,
            GridMenu.BATTLE_MOVE_GRID_MENU.width + 4,
            GridMenu.BATTLE_MOVE_GRID_MENU.height,
            shopItems
        );
    }

    update() {
        this.gridMenu.update();
    }

    render() {
        this.gridMenu.render();
    }

    HpUp() {
        if (this.player.points >= 25) {
            this.player.points -= 25;

            this.player.totalHealth += 2;
            this.player.health = this.player.totalHealth;
        }

        stateStack.pop();
    }

    AtkUp() {
        if (this.player.points >= 50) {
            this.player.points -= 50;

            this.player.weapons.forEach((weapon) => {
                weapon.damage += 1;
            });
        }
        
        stateStack.pop();
    }

    AddSword() {
        if (this.player.points >= 100) {
            this.player.points -= 100;

            this.player.weapons.push(
                new BasicSword(
                    new Vector(
                        this.player.position.x + Weapon.getXWeaponModifier(this.player.weapons.length - 1), 
                        this.player.position.y + Weapon.getYWeaponModifier(this.player.weapons.length - 1)
                    ),
                    this.player
                )
            );
        }
        
        stateStack.pop();
    }
}