import axios from 'axios';
import CurrentUser from '../CurrentUser';
import Course from '../ICourse';


function DisplayCourses({ courses, nextRound, errorHandler, handleGameOver}
    : { courses: [Course, Course], nextRound: () => void, errorHandler: (error : any) => void, handleGameOver: () => void}) {
    return (
        <div className="row justify-content-center fitContent">
            {
                createButton(courses[0])
            }
            {
                createButton(courses[1])
            }
        </div>

    )

    function createButton(course: Course) {
        return <button className="col-md-6 noPadding fitContent buttonPlay" style={{ backgroundColor: "aqua" }} onClick={
            async (e) => {
                postAnswer(e);
            }}>
            <div className="col-8 mx-auto">
                <p className="course-code pPlay">
                    <strong>{course.code}</strong>
                </p>
                <p className='pPlay'>{course.name}</p>
                <p className='pPlay'>{course.failrate}</p>
            </div>
        </button>;

        async function postAnswer(e: React.FormEvent<HTMLButtonElement>) {
            e.preventDefault();
            
            //TODO: Handle error
            try {
                let otherCourse = courses[0].code === course.code ? courses[1].code : courses[0].code;
            console.log("Other course: " + otherCourse)
                const answer = await axios.post('http://localhost:8080/course/answer', {
                    codeClicked: course.code,
                    otherCode: otherCourse
                }); 
                if (answer.data === true) {
                    nextRound();
                }
                else {
                    handleGameOver();
                }
                console.log("Answer posted " + answer.data)
            } catch (e: any) {
                errorHandler(e)
            }
        }
    }
}

export default DisplayCourses;