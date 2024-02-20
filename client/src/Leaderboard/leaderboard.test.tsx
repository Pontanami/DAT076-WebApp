import { render, screen } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import LeaderboardPlayer from './LeaderboardPlayer';
import IPlayer from '../IPlayer';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

test('renders learn react link', () => {

    let p1 : IPlayer ={
        id : 1,
        name : "test",
        score : 0
    }

  render(<LeaderboardPlayer player={p1} index={1}></LeaderboardPlayer>);
  const player = screen.getByText(/test/);
  expect(player).toBeInTheDocument();
});