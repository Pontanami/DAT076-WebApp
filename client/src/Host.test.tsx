import { act, render, screen } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import { MemoryRouter } from 'react-router-dom';
import CurrentUser from './CurrentUser';
import Host from './Host';
import { hostPort } from './hostPort';
import 'core-js';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;


test("Creating a game should render a gamePin", async () => {
    

    let errorCalled = false

    let mockedCurrentUser = {
        id: 1,
        name : "test"
    }
    
    CurrentUser.setActiveUser(mockedCurrentUser.id, mockedCurrentUser.name)

    mockedAxios.post.mockResolvedValue({ status: 201, data: 123 });
    await act(async () => {
        render(<MemoryRouter>
                    <Host
                    errorHandler={() => {
                        errorCalled = true
                    }}
                />
            </MemoryRouter>
        )
    })

    expect(mockedAxios.post).toHaveBeenCalledWith(
        `http://${hostPort}:8080/multiPlayer`,
        { hostId: CurrentUser.getId() }
    );
    
    const gamePin = screen.getByText(/123/);
    expect(gamePin).toBeInTheDocument();
})