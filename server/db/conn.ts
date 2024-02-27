import { Connection ,createConnection } from "mongoose";
import { readFileSync } from 'fs';



const password = readFileSync('./db/password.txt', 'utf-8')

async function makeConnection() : Promise<Connection>{
    return createConnection(`mongodb+srv://pontusen:${password}@chalmershigherlower.akkne3j.mongodb.net/?retryWrites=true&w=majority`)
}

export const conn : Promise<Connection> = makeConnection()
