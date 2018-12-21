
import { GameStateService } from "./game-state.service";
import { Baddie, badShip } from "src/app/logic/Baddie";


export interface Planet {
    name: string,
    type:string,
    land: (v: GameStateService) => null;
};



export const SAMPLE_MAP:Planet[][] = [
    [
        {name:"A desert planet",
        type:"desert-planet",
        land:v=>v.startBattle(badShip())
        },
        {name:"A water planet",
        type:"water-planet",
        land:v=>v.startBattle(badShip())
        }
    ]

]


