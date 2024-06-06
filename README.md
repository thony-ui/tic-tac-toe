
### README.md


# Tic Tac Toe

Tic Tac Toe is a classic two-player game implemented using React, Redux, and Tailwind CSS. This version features a pyramid-shaped board.

Visit [this](https://special-tic-tac-toe.vercel.app) website for a deployed demonstration

## File Structure

```plaintext
TIC-TAC-TOE/
│
├── __tests__/
│   ├── Grid.test.js
│   ├── Header.test.js
│
├── .next/
├── .swc/
├── components/
│   ├── GenerateStars.js
│   ├── Grid.js
│   ├── Header.js
│   ├── Stars.js
│
├── node_modules/
│
├── pages/
│   ├── api/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│
├── public/
│
├── store/
│   ├── darkMode.js
│   ├── index.js
│
├── styles/
│
├── .eslintrc.json
├── .gitignore
├── jest.config.js
├── jest.setup.js
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
├── yarn.lock
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tic-tac-toe
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

## Running the Application

1. Start the development server:
   ```bash
   yarn dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Running Tests

1. To run the tests, use:
   ```bash
   jest
   ```

## Game Rules

- The game is played on a pyramid-shaped board with 9 cells.
- Players take turns to place their marker (either 'O' or 'X') in an empty cell.
- The first player to get three of their markers in a row (horizontally, vertically, or diagonally) wins.
- If all 9 cells are filled and no player has three in a row, the game is a draw.

## Components

### `Grid.js`
- The main game component that handles the game logic and rendering of the grid.

### `Header.js`
- The header component that displays the game title and a dark mode toggle button.

### `GenerateStars.js` & `Stars.js`
- Components related to visual enhancements (optional for game functionality).

## Tests

- `Grid.test.js`: Contains tests for the game logic and winning conditions.
- `Header.test.js`: Contains tests for the header component.

## Store

### `darkMode.js`
- Redux slice to handle dark mode state.

### `index.js`
- Combines the Redux reducers and configures the store.

## Configuration Files

- `.eslintrc.json`: ESLint configuration.
- `jest.config.js`: Jest configuration for running tests.
- `jest.setup.js`: Setup file for Jest.
- `jsconfig.json`: Configuration for JavaScript.
- `next.config.mjs`: Next.js configuration.
- `postcss.config.mjs`: PostCSS configuration.
- `tailwind.config.js`: Tailwind CSS configuration.

## License

This project is licensed under the MIT License.

