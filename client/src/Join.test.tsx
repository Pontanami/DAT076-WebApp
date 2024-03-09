import { render, screen,waitFor } from "@testing-library/react";
import axios, { AxiosStatic } from "axios";
import { act, mockComponent } from "react-dom/test-utils"
import CurrentUser from "./CurrentUser";
import { hostPort } from "./hostPort";
import Join from "./Join";
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

test("If join-button is clicked a request should be sent to the backend, telling it a user should be added to game", async () => {

    let errorCalled = false

    mockedAxios.post.mockResolvedValue({ status: 201, data: 123 });

    act(() =>{
        render(<MemoryRouter>
            <Join
            errorHandler={() => {
                errorCalled = true
            }}
            />
        </MemoryRouter> 
        )
    })
    act(() => {
        const button = screen.getByRole('button');
        button.click();
    })
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
            `http://${hostPort}:8080/multiPlayer/addPlayer`,
            { gameId: 123, playerId: 1234 }
        );
        expect(errorCalled).toBe(false);
        const waitScreen = screen.getByText(/Waiting for host to start game.../)
        expect(waitScreen).toBeInTheDocument();
    });
})

test('An error reponse when posting to multiPlayer/addPlayer should call errorHandler', () => {
    mockedAxios.post.mockResolvedValue({
        status: 500,
        data: "Internal Server Error"
    });

    let errorCalled = false

    act(() =>{
        render(<MemoryRouter>
            <Join
            errorHandler={() => {
                errorCalled = true
            }}
            />
        </MemoryRouter> 
        )
    })

    act(() => {
        const button = screen.getByRole('button');
        button.click();
    })
    waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
            `http://${hostPort}:8080/multiPlayer/addPlayer`,
            { gameId: 123, playerId: 1234 }
        )
        expect(errorCalled).toBe(true);
    });
});