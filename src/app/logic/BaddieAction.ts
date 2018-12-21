import { GameStateService } from "./game-state.service";

export interface BaddieAction {
    id: string;
    name: string;
    apply: (v: GameStateService) => null;
}

export const attack = (damage)=><BaddieAction>({
    id:"attack",
    name:"Attack",
    apply:v=>v.damagePlayer(damage)
})