import { act, render } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { hostPort } from '../hostPort';
import Leaderboard from './Leaderboard';
import 'core-js';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

let errorCalled = false

test('render shoud get the players', async () => {
    await act(async () => {
        render(<MemoryRouter>
                    <Leaderboard
                    errorHandler={() => {
                        errorCalled = true
                    }}
                />
            </MemoryRouter>
        )
    })

    expect(mockedAxios.get).toHaveBeenCalledWith(`http://${hostPort}:8080/leaderboard/players`);

})
