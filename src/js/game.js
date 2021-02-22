import { TYPE_BOX, TYPE_EMPTY, TYPE_PLAYER, TYPE_TARGET } from '../constants/fields';
import { LevelMaps } from '../constants/levelmaps';
import { parseLevelMap } from './levelmaps';

export const findFieldByPos = (posX, posY, map) => {
  const [field] = map.filter(({ x, y }) => x === posX && y === posY);
  return field;
};

export const findFieldsByType = (fieldType, map) => map.filter(({ type }) => fieldType === type);

const updateCoords = (x, dx, y, dy) => ({
  x: x + dx,
  y: y + dy,
});

const canMove = field => {
  const validFields = [TYPE_PLAYER, TYPE_EMPTY, TYPE_TARGET];
  return validFields.includes(field.type);
};

const updateBoxPosition = (currentBoxField, targetBoxField, fields) => {
  fields.forEach((field, i) => {
    if (field.id === currentBoxField.id) {
      fields[i] = {
        ...currentBoxField,
        type: TYPE_EMPTY,
      };
    }
    if (field.id === targetBoxField.id) {
      fields[i] = {
        ...targetBoxField,
        type: TYPE_BOX,
        complete: targetBoxField.type === TYPE_TARGET,
      };
    }
  });
  return fields;
};

const checkLevelComplete = map => {
  const boxes = findFieldsByType(TYPE_BOX, map);
  return boxes.filter(({ complete }) => !complete).length === 0;
};

export const updateLevel = (direction, currentLevel) => {
  const { map, playerPos } = currentLevel;
  const { dx, dy } = direction;

  const newPosition = updateCoords(playerPos.x, dx, playerPos.y, dy);
  const nextStep = findFieldByPos(newPosition.x, newPosition.y, map);

  let position = playerPos;
  let updatedMap = [...map];

  if (nextStep) {
    if (canMove(nextStep)) {
      position = newPosition;
    }
    if (nextStep.type === TYPE_BOX) {
      const newBoxPos = updateCoords(nextStep.x, dx, nextStep.y, dy);
      const targetBoxField = findFieldByPos(newBoxPos.x, newBoxPos.y, map);

      if (canMove(targetBoxField)) {
        position = newPosition;
        updatedMap = updateBoxPosition(nextStep, targetBoxField, map);
      }
    }
  }

  return {
    ...currentLevel,
    playerPos: position,
    map: updatedMap,
    isLevelComplete: checkLevelComplete(updatedMap),
  };
};

const createLevel = (mapString, index) => {
  const map = parseLevelMap(mapString);
  const targets = findFieldsByType(TYPE_TARGET, map);
  const [playerPos] = findFieldsByType(TYPE_PLAYER, map);

  return {
    map,
    targets,
    playerPos,
    index,
    isLevelComplete: false,
  };
};

export const createGame = () => {
  const levels = LevelMaps.map(createLevel);
  return {
    levels,
    currentGameTime: 0,
    currentLevelIndex: 0,
    currentLevel: levels[0],
    isGameComplete: false,
  };
};
