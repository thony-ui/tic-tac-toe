import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../components/Header';
import { change } from '../store/darkMode';

// Mock the `change` action
jest.mock('../store/darkMode', () => ({
  change: jest.fn().mockReturnValue({ type: 'darkMode/change' })
}));

const mockStore = configureStore([]);

describe('Header Component', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = { darkMode: { value: false } };
    store = mockStore(initialState);
  });

  test('renders the header with light mode initially', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Check for the welcome text
    expect(screen.getByText('Welcome to Pyramid Tic Tac Toe')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  test('toggles dark mode on icon click', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Mock initial state to be light mode
    initialState = { darkMode: { value: true } };
    store = mockStore(initialState);

    // Check for the moon icon to be present (light mode)
    const moonIcon = screen.getByTestId('moon-icon');
    expect(moonIcon).toBeInTheDocument();

    // Click on the moon icon to switch to dark mode
    fireEvent.click(moonIcon);

    // Dispatch should have been called
    expect(change).toHaveBeenCalled();
  });
});
