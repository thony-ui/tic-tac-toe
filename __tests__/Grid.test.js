import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Grid from '../components/Grid';

// Mock the `changeShape` action
const mockStore = configureStore([]);

beforeAll(() => {
  window.alert = jest.fn();
});

afterAll(() => {
  window.alert.mockRestore();
});

describe('Grid Component', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      darkMode: { value: false }
    };
    store = mockStore(initialState);
    jest.clearAllMocks()
  });

  test('renders the grid correctly', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(9);
  });

  test('handles cell click and updates the cell content', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('O');

  });

  test('changes shape after each click', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );
    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('O');
    fireEvent.click(cells[1])
    expect(cells[1]).toHaveTextContent('X');
  });

  // Winning condition tests
  test('detects winning condition [0, 1, 4]', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // O
    fireEvent.click(cells[2]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[4]); // O - wins

    expect(screen.getByText('Player With O Won')).toBeInTheDocument();
  });

  test('detects winning condition [0, 2, 6]', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[2]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[6]); // O - wins

    expect(screen.getByText('Player With O Won')).toBeInTheDocument();
  });

  test('detects winning condition [0, 3, 8]', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[2]); // X
    fireEvent.click(cells[8]); // O - wins

    expect(screen.getByText('Player With O Won')).toBeInTheDocument();
  });

  test('detects winning condition [1, 2, 3]', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[2]); // O
    fireEvent.click(cells[4]); // X
    fireEvent.click(cells[3]); // O - wins

    expect(screen.getByText('Player With O Won')).toBeInTheDocument();
  });

  test('detects winning condition [4, 5, 6]', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[5]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[6]); // O - wins

    expect(screen.getByText('Player With O Won')).toBeInTheDocument();
  });

  test('detects winning condition [5, 6, 7]', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[5]); // O
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[6]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[7]); // O - wins

    expect(screen.getByText('Player With O Won')).toBeInTheDocument();
  });

  test('detects winning condition [6, 7, 8]', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[6]); // O
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[7]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[8]); // O - wins

    expect(screen.getByText('Player With O Won')).toBeInTheDocument();
  });

  // Edge cases
  test('does not allow clicking on an already occupied cell', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // O
    fireEvent.click(cells[0]); // Click again
    expect(cells[0]).toHaveTextContent('O');
  });

  test('does not allow further clicks after a player has won', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // O
    fireEvent.click(cells[2]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[4]); // O - wins

    // Try clicking other cells
    fireEvent.click(cells[5]); // Attempt to click after win
    fireEvent.click(cells[6]); // Attempt to click after win

    expect(cells[5]).toHaveTextContent('');
    expect(cells[6]).toHaveTextContent('');
  });

  test('does not allow further clicks after a draw', () => {
    render(
        <Provider store={store}>
          <Grid />
        </Provider>
      );
    const cells = screen.getAllByRole('cell');

    fireEvent.click(cells[0]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[2]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[5]); // O
    fireEvent.click(cells[4]); // X
    fireEvent.click(cells[7]); // O
    fireEvent.click(cells[6]); // X
    fireEvent.click(cells[8]); // O - Draw

    expect(screen.getByText('Game drawn')).toBeInTheDocument();

    // Try clicking other cells after draw
    fireEvent.click(cells[5]);
    fireEvent.click(cells[6]);

    expect(cells[5]).toHaveTextContent('O');
    expect(cells[6]).toHaveTextContent('X');
  });

  test('resets the game when reset button is clicked', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );

    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // O
    fireEvent.click(cells[1]); // X

    fireEvent.click(screen.getByText('Reset'));
    
    cells.forEach(cell => {
      expect(cell).toHaveTextContent('');
    });
    expect(screen.queryByText('Player With O Won')).toBeNull();
    expect(screen.queryByText('Game Drawn')).toBeNull();
  });

  test('Undo button', () => {
    render(
      <Provider store={store}>
        <Grid />
      </Provider>
    );
    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(screen.getByText("Undo"))
    fireEvent.click(screen.getByText("Undo"))

    fireEvent.click(cells[2])

    expect(cells[2]).toHaveTextContent('O')


    
  });
});
