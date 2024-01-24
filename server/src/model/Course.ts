class Course{
    code: string;
    name: string;
    failrate: number;

    constructor(code: string, name: string, passrate: number){
        this.code = code;
        this.name = name;
        this.failrate = 100-passrate;
    }
}