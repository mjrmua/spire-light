import { GameStateService } from "./game-state.service";
import { BoundedValue } from "./state";
import * as BaddieAction from "./BaddieAction";

export interface Baddie {
    health: BoundedValue;
    shield: number;
    plan: BaddieAction.BaddieAction[];
    act: (v: GameStateService) => null;
}

export const badShip = ()=> ({
    health:{
        maximum:50,
        current:50
    },
    shield:10,
    plan:[BaddieAction.attack(20)],
    act: v=>v.damagePlayer(20)
});