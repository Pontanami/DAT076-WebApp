import { Player } from "../model/player";

export interface IPLayerService {

    // getPlayers returns a list of all players
    getPlayers(): Promise<Player[]>;

    // getPlayer returns a player with the given id
    getPlayer(id: number): Promise<Player>;

    // getPlayerByName returns a player with the given name
    getPlayerByName(name: string): Promise<Player | undefined>;

    // createPlayer creates a new player with the given name and id
    createPlayer(id: number,name: string): Promise<Player>;

    // updatePlayerScore updates the score of the player with the given id
    updatePlayerScore(id: number): Promise<Player | undefined>;

    // resetPlayerScore resets the score of the player with the given id
    resetPlayerScore(id: number): Promise<Player | undefined>;
}