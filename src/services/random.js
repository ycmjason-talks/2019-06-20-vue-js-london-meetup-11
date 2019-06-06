export const randomNumber = (min, max) => min + Math.random() * (max - min);

export const randomHex = (min, max) => Math.round(randomNumber(min, max)).toString(16);

export const randomPercentage = () => `${randomNumber(0, 100)}%`;

export const randomColor = () => '#' + Array.from({ length: 6 }, () => randomHex(0, 16)).join('');
