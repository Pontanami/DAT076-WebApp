import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import PlayScreen from './PlayScreen';
import Course from '../ICourse';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

let course : Course;
let course2: Course;
let courseTuple : [Course, Course];
let handleCorrectGuess: boolean;
let errorCalled: boolean;
let handleWrongGuess: boolean;

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
    handleCorrectGuess = false;
    errorCalled = false;
    handleWrongGuess = false;
});

const renderPlayScreen = (): void => {
    render(
        <PlayScreen 
            courseList={courseTuple} 
            handleCorrectGuess={function (): void {  handleCorrectGuess = true;}} 
            errorHandler={function (error: any): void {errorCalled = true; }} 
            handleWrongGuess={function (): void {  handleWrongGuess = true;
        }} />
    );
};

test('render PlayScreen shows the two courses and timer', () => {

    renderPlayScreen();

    const course2Name = screen.getByText(/Test Course2/i);
    const course1Code = screen.getByText(/ABC123/i);
    const timer = screen.getByText(/15/i);
    expect(course2Name).toBeInTheDocument();
    expect(course1Code).toBeInTheDocument();
    expect(timer).toBeInTheDocument();
    expect(errorCalled).toBe(false);
    expect(handleCorrectGuess).toBe(false);
    expect(handleWrongGuess).toBe(false);
});

test('An error reponse when getting player score should call errorHandler', () => {
    mockedAxios.get.mockResolvedValue({
        status: 500,
        data: "Internal Server Error"
    });
    renderPlayScreen();
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(true);
        expect(handleCorrectGuess).toBe(false);
        expect(handleWrongGuess).toBe(false);
    });
});

test('A correct guess should call handleCorrectGuess', () => {
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: "true"
    });
    renderPlayScreen();
    const button = screen.getAllByRole('button');
    fireEvent.click(button[1]);
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(false);
        expect(handleCorrectGuess).toBe(true);
        expect(handleWrongGuess).toBe(false);
    });
});

test('A wrong guess should call handleWrongGuess', () => {
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: "false"
    });
    renderPlayScreen();
    const button = screen.getAllByRole('button');
    fireEvent.click(button[0]);
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(errorCalled).toBe(false);
        expect(handleWrongGuess).toBe(true);
        expect(handleCorrectGuess).toBe(false);
    });
});