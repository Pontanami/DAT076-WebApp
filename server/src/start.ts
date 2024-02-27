import express from "express";
import { leaderboardRouter } from "./router/leaderboard";
import { playerRouter } from "./router/player";
import { courseRouter } from "./router/course";
import { PlayerService } from "./service/player";
import cors from "cors";
import { json } from "stream/consumers";
import { CourseService } from "./service/course";
import { singlePlayerRouter } from "./router/singlePlayer";
import { userService } from "./service/user";
import { userRouter } from "./router/user";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/leaderboard", leaderboardRouter);
app.use("/player", playerRouter);
app.use("/course", courseRouter);
app.use("/singlePlayer", singlePlayerRouter);
app.use("/user", userRouter)

const courseService = CourseService.getInstance()
const UserService = new userService()

const url = "https://stats.ftek.se/courses?items=100"
        var XMLHttpRequest = require('xhr2');
        let a = new XMLHttpRequest;
        a.open("GET", url);
        a.send();
        a.onreadystatechange = async function(){


            if(a.readyState === 4 && a.status === 200){

                const obj = JSON.parse(a.responseText)
                const courses : Object[] = obj.courses

                let i = 0;
                courses.forEach(async data => {
                    let course = JSON.parse(JSON.stringify(data))
                    
                    let code = course.courseCode
                    let name = course.courseName
                    let prate : number = course.passRate * 100;
                    let failrate : number = 100 - prate;
                    let decimalPlaces = 2
                    let failrateRounded = Number(Math.round(parseFloat(failrate + 'e' + decimalPlaces)) + 'e-' + decimalPlaces)
                    let people = course.total

                    /*
                    console.log("Code for course: " + code + "\n");
                    console.log("Name of course: " + name + "\n");
                    console.log("Passrate of course: " + prate + " \n")
                    console.log("People in course: " + people + " \n")



                    console.log("-----------------\n")
                    i += 1
                    */
                    if(people >= 100){
                        await courseService.createCourse(code, name, failrateRounded)
                    }
                });
                //console.log("Finished with adding tasks")
                //let player = await UserService.createUser("test", "test")
                //console.log(JSON.stringify(player))
            }
        }
