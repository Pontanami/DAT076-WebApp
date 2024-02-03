export class Player{
    id: number;
    name: string;
    score: number;
    

    constructor(name: string) {
        this.id = Date.now(); //tills vi har rimligt unikt id
        this.name = name;
        this.score = 0;
    }

}