/*  eslint no-undef: 0  */
const { calculate, BLOCK_SIZE, symbols } = require('../src/lib/game');
const { checkWinningRole } = require('../src/lib/game');

describe('game logic', () => {
  test('checkWinningRole should work', () => {
    const winningRole = ['a', 'a', 'a'];
    const losingRole = ['a', 'b', 'c'];
    expect(checkWinningRole(winningRole)).toBe(true);
    expect(checkWinningRole(losingRole)).toBe(false);
  });

  test('calculate should eventually return a role', () => {
    const role = calculate(10);
    expect(role.length).toBe(BLOCK_SIZE);
    role.forEach((symbol) => {
      expect(symbols.includes(symbol));
    });
  });
});
