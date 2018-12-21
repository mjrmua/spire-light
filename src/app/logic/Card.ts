import { GameStateService } from "./game-state.service";

enum CardType {
    Attack = "Attack",
    Engineering = "Engineering",
    Drone = "Drone",
    Cargo = "Cargo",
}
export interface Card {
    id: number;
    purchasePrice: number;
    name: string;
    type: CardType;
    energyCost: number;
    description: string;
    apply: (v: GameStateService) => null;
}

export const laser = ()=><Card>({
    id: 0,
    purchasePrice: -1,
    name: "laser",
    title: "Laser",
    type: "Attack",
    energyCost: 1,
    description: "5 Damage",
    apply: v=>v.damageBaddie(5)
});

export const shield = ()=><Card>({
    id: 0,
    purchasePrice: -1,
    name: "shield",
    title:"Shield",
    type: "Engineering",
    energyCost: 1,
    description: "+5 Shield",
    apply: v=>v.addShields(5)
});

export const reactorOverload = ()=><Card>({
    id: 0,
    purchasePrice: 50,
    name: "reactorOverload",
    title:"Reactor overload",
    type: "Engineering",
    energyCost: 0,
    description: "+1 Energy",
    apply: v=>v.addEnergy(1)
});

export const attackDrone = ()=><Card>({
    id: 0,
    purchasePrice: 25,
    name: "attackDrone",
    title:"Combat Wasp",
    type: "Drone",
    energyCost: 3,
    description: "At the start of your turn, deal 1 damage to a random enemy (not working yet)",
    apply: v=>console.log("drone launched")
});

export const spices = ()=><Card>({
    id: 0,
    purchasePrice: 10,
    name: "spices",
    title:"Exotic Spices",
    type: "Cargo",
    energyCost: 0,
    description: "Cannot be played. Can be sold. Sale prices increases wth each jump taken",
    apply: v=>null
});