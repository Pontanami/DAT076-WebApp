import {MongoMemoryServer} from "mongodb-memory-server";
import { Connection, createConnection} from "mongoose"

async function makeConnection() : Promise<Connection> {
    const mongodb = await MongoMemoryServer.create();
    return createConnection(mongodb.getUri());
}

export const conn : Promise<Connection> = makeConnection()