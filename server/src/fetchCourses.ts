import { CourseService } from "./service/course";

const courseService = CourseService.getInstance()

export function fetchCourses(){

    const nrCourses = 100

    const url = `https://stats.ftek.se/courses?items=${nrCourses}`
    var XMLHttpRequest = require('xhr2');
    let xmlReq = new XMLHttpRequest;
    xmlReq.open("GET", url);
    xmlReq.send();
    xmlReq.onreadystatechange = async function(){


        if(xmlReq.readyState === 4 && xmlReq.status === 200){

            const obj = JSON.parse(xmlReq.responseText)
            const courses : Object[] = obj.courses

            courses.forEach(async data => {
                let course = JSON.parse(JSON.stringify(data))
                
                let code = course.courseCode
                let name = course.courseName
                let prate : number = course.passRate * 100;
                let failrate : number = 100 - prate;
                let decimalPlaces = 2
                let failrateRounded = Number(Math.round(parseFloat(failrate + 'e' + decimalPlaces)) + 'e-' + decimalPlaces)
                let people = course.total

                if(people >= 100){
                    await courseService.createCourse(code, name, failrateRounded)
                }
            });
        }
    }
}

