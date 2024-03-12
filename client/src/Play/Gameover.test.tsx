import { render, screen } from '@testing-library/react';

import Gameover from './Gameover';
import { MemoryRouter } from 'react-router-dom';

test('render GameOver shows the game over screen', () => {
    render(
    <MemoryRouter>
    <Gameover />
    </MemoryRouter>);
    const gameOver = screen.getByText(/Game Over/i);
    expect(gameOver).toBeInTheDocument();
    const gif = screen.getByRole('img');
    expect(gif).toBeInTheDocument();
    expect(gif).toHaveAttribute('src');
    expect(gif).toHaveAttribute('src', expect.stringContaining('end'));
    expect(gif).toHaveAttribute('src', expect.stringContaining('.gif'));
});