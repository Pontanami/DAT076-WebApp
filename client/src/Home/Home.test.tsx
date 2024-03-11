import { act, render, screen, waitFor } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import Home from './Home';
import exp from 'constants';
import { MemoryRouter } from 'react-router-dom';
import { hostPort } from '../hostPort';
import CurrentUser from '../CurrentUser';
import { url } from 'inspector';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

let mockedCurrentUser = {
    id: 1,
    name : "test"
}

CurrentUser.setActiveUser(mockedCurrentUser.id, mockedCurrentUser.name)

test("Home should create a player of current user", async () => {
    let errorHandler = false
    await act(async () => {
        render(
            <MemoryRouter>
                <Home
                    errorHandler={() => { errorHandler = true }}
                />
            </MemoryRouter>

        )
    })

    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: "Player created"
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
        `http://${hostPort}:8080/player`,
        { id: 1,
          name: "test" }
    );
})