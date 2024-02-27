import {Schema, Model} from "mongoose";

import { conn } from "./conn";
import { user } from "../src/model/user";

const userSchema : Schema = new Schema({

    id : {
   
    type : Number,
   
    required : true,
   
    unique: true
   
    },
   
    username : {
   
    type : String,
   
    required : true,

    unique: true
   
    },
   
    password : {
   
    type : String,
   
    required : true
   
    }
   
   });

async function makeModel() : Promise<Model<user>> {
    return (await conn).model<user>("user", userSchema)
}

export const userModel : Promise<Model<user>> = makeModel()