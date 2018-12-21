import { Card, laser, shield, reactorOverload, spices, attackDrone } from "./Card";
import { Baddie, badShip } from "./Baddie";
import { Planet, SAMPLE_MAP } from "./planet";

export enum View {
    Store= "Store",
    Map="Map",
    Battle="Battle",
}

export interface BoundedValue {
    maximum: number;
    current: number;
}


export interface State {
    level:number;
    map: Planet[][],
    view: View;
    money: number;
    deck: Card[];
    drawStack: Card[];
    hand: Card[];
    discards: Card[];
    trash: Card[];
    energy: BoundedValue;
    health: BoundedValue;
    shield: number;
    baddie: Baddie;
    store: {
        forSale: Card[];
    }
}

export const START_STATE:State = {
    level:0,
    map: SAMPLE_MAP,
    view: View.Store,
    money: 100,
    deck:[
        laser(),laser(),laser(),laser(),laser(),
        shield(),shield(),shield(),shield(),shield()
    ],
    drawStack: [],
    hand: [
    ],
    discards: [],
    trash: [],
    energy: {
        maximum: 3,
        current:3
    },
    health: {
        maximum: 80,
        current: 80
    },
    shield:0,
    baddie: badShip(),
    store: {
        forSale: [
            reactorOverload(),
            attackDrone(),
            spices(), 
            spices(), 
        ]
    }
}