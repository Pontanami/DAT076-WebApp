export class Player{
    name: string;
    score: number;
    id: number;

    constructor(name: string) {
        this.name = name;
        this.id = Date.now(); //tills vi har rimligt unikt id
        this.score = 0;
    }

}