import {
  TYPE_BOX,
  TYPE_EMPTY,
  TYPE_PLACEHOLDER,
  TYPE_PLAYER,
  TYPE_TARGET,
  TYPE_WALL,
} from '../constants/fields';

export const getFieldType = char => {
  switch (char) {
    case '#':
      return TYPE_WALL;
    case '/':
      return TYPE_PLACEHOLDER;
    case 'B':
      return TYPE_BOX;
    case 'T':
      return TYPE_TARGET;
    case 'P':
      return TYPE_PLAYER;
    case '0':
      return TYPE_EMPTY;
    default:
      return TYPE_PLACEHOLDER;
  }
};

export const parseLevelMap = string => {
  const levelmapArray = string.split('\n').map(row => row.trim().split(''));
  const levelMap = [];
  let index = 0;

  for (let i = 0; i < levelmapArray.length; i++) {
    const row = levelmapArray[i];
    for (let j = 0; j < row.length; j++) {
      const type = getFieldType(row[j]);
      levelMap.push({
        id: index,
        type,
        x: j,
        y: i,
        complete: false,
      });
      index++;
    }
  }
  return levelMap;
};
