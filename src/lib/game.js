export const symbols = ['c', 'l', 'o', 'w'];
export const symbolNameMap = {
  c: 'Cherry',
  l: 'Lemon',
  o: 'Orange',
  w: 'WaterMelon',
};
export const BLOCK_SIZE = 3;

export const rewardOfSymbol = {
  c: 10,
  l: 20,
  o: 30,
  w: 40,
};

function getRandomRole() {
  return Array(BLOCK_SIZE).fill(null).map(() => {
    const index = Math.floor(Math.random() * symbols.length);
    return symbols[index];
  });
}

export function checkWinningRole(role) {
  const filterUniques = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);
  const uniques = filterUniques(role);
  return uniques.length === 1;
}

export function checkReward(role) {
  return rewardOfSymbol[role[0]];
}

function shouldReRoll(currentUserCredit) {
  let reRollingChance = 0;
  if (currentUserCredit > 60) {
    reRollingChance = 60;
  } else if (currentUserCredit > 40 && currentUserCredit < 60) {
    reRollingChance = 30;
  }

  const randomNumber = (Math.random() * 100) + 1;
  return randomNumber - reRollingChance < 0;
}

export function calculate(currentUserCredit) {
  // calculate the role
  const role = getRandomRole();
  const isWinningRole = checkWinningRole(role);
  if (isWinningRole && shouldReRoll(currentUserCredit)) {
    return calculate(currentUserCredit);
  }
  return role;
}
