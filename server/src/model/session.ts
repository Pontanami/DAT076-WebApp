import {Player} from "../model/player";
import { Course } from "./course";

export interface Session {
    id: number;
    players: Player[];
    questions: Course[];
}