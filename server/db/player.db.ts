import {Schema, Model} from "mongoose";

import {Player} from "../src/model/player";

import { conn } from "./conn";

const playerSchema = new Schema<Player>({
    id: {type: Number, required: true, unique: true},

    name: {type: String, required: true},

    score: {type: Number, required: true}

})

export const playerModel = conn.model<Schema>("Player", playerSchema);