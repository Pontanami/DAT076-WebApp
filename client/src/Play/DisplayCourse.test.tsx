import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import DisplayCourses from './DisplatCourse';
import Course from '../ICourse';
import axios, { AxiosStatic } from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

let course: Course;
let course2: Course;
let courseTuple: [Course, Course];
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
        bgnumber: 1
    }
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

async function renderDisplayCourses() {
    await act(async () => {
        render(<MemoryRouter>
            <DisplayCourses courses={courseTuple}
                nextRound={function (): void {
                    nextRoundCalled = true;
                }} errorHandler={function (error: any): void {
                    errorCalled = true;
                }} handleGameOver={function (): void {
                    gameOverCalled = true;
                }} stopTimer={function (): void {
                    stopTimerCalled = true;
                }} />
        </MemoryRouter>
        )
    })
}

test('render DisplayCourses shows the two courses', async () => {
    await renderDisplayCourses();
    const course2Name = screen.getByText(/Test Course2/i);
    const course1Code = screen.getByText(/ABC123/i);
    expect(course2Name).toBeInTheDocument();
    expect(course1Code).toBeInTheDocument();
    expect(errorCalled).toBe(false);
});

test('An error reponse when posting to /course/answer should call errorHandler', async () => {
    mockedAxios.post.mockResolvedValue({
        status: 500,
        data: "Internal Server Error"
    });
    await renderDisplayCourses();

    const button = screen.getAllByRole('button');
    fireEvent.click(button[0]);
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(true);
        expect(nextRoundCalled).toBe(false);
        expect(gameOverCalled).toBe(false);
    });
});

test('A correct response when posting to /course/answer should call nextRound', async () => {
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: true
    });
    await renderDisplayCourses();

    const button = screen.getAllByRole('button');
    fireEvent.click(button[1]);
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(false);
        expect(nextRoundCalled).toBe(true);
        expect(gameOverCalled).toBe(false);
    });
});

test('A incorrect response when posting to /course/answer should call gameOver', async () => {
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: false
    });
    await renderDisplayCourses();

    const button = screen.getAllByRole('button');
    fireEvent.click(button[1]);
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(false);
        expect(gameOverCalled).toBe(true);
    });
});

test('Posting to /course/answer should call stopTimer', async () => {
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: true
    });
    await renderDisplayCourses();

    const button = screen.getAllByRole('button');
    fireEvent.click(button[1]);
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(false);
        expect(stopTimerCalled).toBe(true);
    });
});

