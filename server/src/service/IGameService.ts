import { Course } from "../model/course";
import { Game } from "../model/game";

export interface IGameService{

      /**
     * Asynchronously creates a new game with a unique id and adds it to a list in the singleton.
     * 
     * @returns {Promise<Game>} - Returns the created game.
     */
     createGame(): Promise<Game>;

    /**
     * Asynchronously gets the game with the provided id.
     * @param gameId - The id of the game.
     * @returns {Promise<Game>} - Returns the game.
     * @throws {Error} - Throws an error if the game does not exist.
     */
    getGame(id: number): Promise<Game>;

    /**
     * Asynchronously adds a question to the game with the provided id.
     * @param gameId - The id of the game.
     * @returns {Promise<Course>} - Returns all the questions in the game.
     */
    getGameQuestions(gameId: number): Promise<Course[]>;

    /**
     * Returns the current questions in the game with the provided id.
     * @param gameId - The id of the game.
     * @returns {Promise<[Course, Course]>} - Returns the current questions in the game.
     * @throws {Error} - Throws an error if there are no questions in the game.
     */
    getCurrentQuestions(gameId: number): Promise<[Course, Course]>;

    /**
     * Starts the next round in the game with the provided id.
     * @param id - The id of the game.
     * @returns {Promise<[Course, Course]>} - Returns the questions for the next round in the game.
     */
    startNextRound(id: number): Promise<[Course, Course]>;
}