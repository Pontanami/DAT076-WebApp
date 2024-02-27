import {Schema, Model} from "mongoose";

import {Player} from "../model/player";

import { conn } from "./conn";

const playerSchema = new Schema<Player>({
    id: {type: Number, required: true, unique: true},

    name: {type: String, required: true},

    score: {type: Number, required: true}

})

async function makeModel() : Promise<Model<Player>> {
    return (await conn).model<Player>("Player", playerSchema)
}


export const playerModel : Promise<Model<Player>> = makeModel()