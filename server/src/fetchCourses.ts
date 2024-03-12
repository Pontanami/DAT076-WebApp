import { CourseService } from "./service/course";

export class CourseFetcher {

    nrCourses: number

    constructor(nrCourses: number) {
        this.nrCourses = nrCourses
    }

    fetchCourses(): void {
        const courseService = CourseService.getInstance()
        const url = `https://stats.ftek.se/courses?items=${this.nrCourses}`
        var XMLHttpRequest = require('xhr2');
        let xmlReq = new XMLHttpRequest;
        xmlReq.open("GET", url);
        xmlReq.send();
        xmlReq.onreadystatechange = async function () {
            if (xmlReq.readyState === 4 && xmlReq.status === 200) {

                const obj = JSON.parse(xmlReq.responseText)
                const courses: Object[] = obj.courses

                courses.forEach(async data => {
                    let course = JSON.parse(JSON.stringify(data))

                    let code = course.courseCode;
                    let name = course.courseName;
                    let program = course.programLong;
                    let prate: number = course.passRate * 100;
                    let failrate: number = 100 - prate;
            
                    let decimalPlaces = 2;
                    let failrateRounded = Number(Math.round(parseFloat(failrate + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
                    let people = course.total;
                    if (people >= 100) {
                        
                        await courseService.createCourse(code, name, program, failrateRounded)
                    }
                });
            }
        }
    }
}



