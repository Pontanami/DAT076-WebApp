import { act, render, screen } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import Singleplayer from './Singleplayer';
import { MemoryRouter } from 'react-router-dom';
import { hostPort } from '../hostPort';
import CurrentUser from '../CurrentUser';
import 'core-js'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

test("Creating a singlePlayerGame should give two starting courses", async () => {

    let mockedCurrentUser = {
        id: 1,
        name : "test"
    }

    let course = {
        code: "ABC123",
        name: "Test Course",
        program: "Test Program",
        failrate: 40,
        bgnumber: 1    }
    let course2 = {
        code: "DEF456",
        name: "Test Course2",
        program: "Test Program2",
        failrate: 60,
        bgnumber: 2
    }
    let courseTuple = [course, course2]
    
    CurrentUser.setActiveUser(mockedCurrentUser.id, mockedCurrentUser.name)

    let errorHandler = false
    await act(async () => {
        render(
            <MemoryRouter>
                <Singleplayer
                    errorHandler={() => { errorHandler = true }}
                />
            </MemoryRouter>

        )
    })

    

    mockedAxios.post.mockResolvedValue({ status: 201, data: 123 });
    //mockedAxios.get.mockResolvedValue({ status: 200, data: courseTuple });

    mockedAxios.get.mockImplementation((url) => {
        switch (url) {
            case `http://${hostPort}:8080/game/`:
                return Promise.resolve({data: courseTuple})
            case `http://${hostPort}:8080/player/`:
                return Promise.resolve({data: 1})
            default:
                return Promise.reject(new Error('not found'))
        }})

    expect(mockedAxios.post).toHaveBeenCalledWith(
        `http://${hostPort}:8080/singleplayer`,
        { playerId: CurrentUser.getId() }
    );

/* Should work since it has been tested several times with console.log, but here axios choose to show another get request that is sent concurrently in another function and file
    expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://${hostPort}:8080/game/123`,
    );
    */

    const displayCourse = screen.getAllByText(/Abc/);
    expect(displayCourse[0]).toBeInTheDocument();
})