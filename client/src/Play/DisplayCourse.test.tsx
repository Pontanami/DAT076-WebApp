import { render, screen, waitFor } from '@testing-library/react';
import DisplayCourses from './DisplatCourse';
import Course from '../ICourse';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

let course : Course;
let course2: Course;
let courseTuple : [Course, Course];
let errorCalled: boolean;
let gameOverCalled: boolean;
let nextRoundCalled: boolean;
let stopTimerCalled: boolean;

beforeEach(() => {
    course = {
        code: "ABC123",
        name: "Test Course",
        program: "Test Program",
        failrate: 40,
        bgnumber: 1    }
     course2 = {
        code: "DEF456",
        name: "Test Course2",
        program: "Test Program2",
        failrate: 60,
        bgnumber: 2
    }
    courseTuple = [course, course2]
    errorCalled = false;
    gameOverCalled = false;
    nextRoundCalled = false;
    stopTimerCalled = false;
});

const renderDisplayCourses = (): void => {
    render(<DisplayCourses courses={courseTuple} 
        nextRound={function (): void {
        nextRoundCalled = true;
    } } errorHandler={function (error: any): void {
        errorCalled = true;
    } } handleGameOver={function (): void {
        gameOverCalled = true;
    } } stopTimer={function (): void {
        stopTimerCalled = true;
    } } />);
};

test('render DisplayCourses shows the two courses', () => {
    renderDisplayCourses();
    const course2Name = screen.getByText(/Test Course2/i);
    const course1Code = screen.getByText(/ABC123/i);
    expect(course2Name).toBeInTheDocument();
    expect(course1Code).toBeInTheDocument();
    expect(errorCalled).toBe(false);
    });

test('An error reponse when posting to /course/answer should call errorHandler', () => {
    mockedAxios.post.mockResolvedValue({
        status: 500,
        data: "Internal Server Error"
    });
    renderDisplayCourses();

    const button = screen.getAllByRole('button');
    button[1].click();
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(true);
        expect(nextRoundCalled).toBe(false);
        expect(gameOverCalled).toBe(false);
    });
});

test('A correct response when posting to /course/answer should call nextRound', () => {
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: true
    });
    renderDisplayCourses();

    const button = screen.getAllByRole('button');
    button[1].click();
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(false);
        expect(nextRoundCalled).toBe(true);
        expect(gameOverCalled).toBe(false);
    });
});

test('A incorrect response when posting to /course/answer should call gameOver', () => {
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: false
    });
    renderDisplayCourses();

    const button = screen.getAllByRole('button');
    button[0].click();
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(false);
        expect(gameOverCalled).toBe(true);
    });
});

test('Posting to /course/answer should call stopTimer', () => {
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: true
    });
    renderDisplayCourses();

    const button = screen.getAllByRole('button');
    button[1].click();
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(false);
        expect(stopTimerCalled).toBe(true);
    });
});

