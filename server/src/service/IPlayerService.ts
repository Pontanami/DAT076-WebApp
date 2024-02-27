import { Player } from "../model/player";

export interface IPLayerService{

getPlayers() : Promise<Player[]>;

getPlayer(id: number) : Promise<Player>;

getPlayerByName(name: string) : Promise<Player | undefined>;

createPlayer(name: string): Promise<Player>;

updatePlayerScore(id: number) : Promise<Player | undefined>;

resetPlayerScore(id: number) : Promise<Player | undefined>;
}