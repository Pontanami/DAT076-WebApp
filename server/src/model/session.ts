import { Course } from "./course";

export interface Session {
    id: number;
    questions: Course[];
}