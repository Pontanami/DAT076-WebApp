import axios, { AxiosStatic } from "axios";
import MultiPlayer from "./MultiPlayer";
import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { hostPort } from "../hostPort";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

let errorHandler = false;
let course = {
    code: "ABC123",
    name: "Test Course",
    program: "Test Program",
    failrate: 40,
    bgnumber: 1
}
let course2 = {
    code: "DEF456",
    name: "Test Course2",
    program: "Test Program2",
    failrate: 60,
    bgnumber: 2
}

async function renderMultiPlayer() {
    await act(async () => {
        <MemoryRouter>
        render(<MultiPlayer errorHandler={() => { }} />)
        </MemoryRouter>
    })
}

test("Rendering Multiplayer should call fetchCurrentQuestions", async () => {
    await renderMultiPlayer();

    mockedAxios.get.mockResolvedValue({ status: 200, data: [course, course2] });

    waitFor(() => {
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://${hostPort}:8080/game/`);
    expect(errorHandler).toBe(false);
    });
});
test("An error response when fetching current questions should call errorHandler", async () => {
    await renderMultiPlayer();

    mockedAxios.get.mockRejectedValue({ status: 404 });

    waitFor(() => {
        expect(errorHandler).toBe(true);
    });
});


