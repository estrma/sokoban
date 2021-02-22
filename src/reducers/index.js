import { SCREEN_GAME, SCREEN_LEADERBOARD, SCREEN_MENU } from '../constants/screens';

import {
  ADD_SCORE_TO_LEADERBOARD,
  LOAD_NEXT_LEVEL,
  MOVE,
  RESTART_LEVEL,
  SHOW_LEADERBOARD,
  SHOW_MENU,
  START_GAME,
} from '../constants/actions';

import { createGame, updateLevel } from '../js/game';

const initialState = {
  currentScreen: SCREEN_MENU,
  leaderboard: [],
  ...createGame(),
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case MOVE: {
      const { currentLevel, isGameComplete } = state;
      const { direction } = action;
      const { isLevelComplete } = currentLevel;
      if (isGameComplete || isLevelComplete) return { ...state };
      return { ...state, currentLevel: updateLevel(direction, currentLevel) };
    }

    case LOAD_NEXT_LEVEL: {
      const { currentLevelIndex, levels } = state;
      const nextLevel = levels[currentLevelIndex + 1];
      if (nextLevel) {
        return {
          ...state,
          currentLevel: nextLevel,
          currentLevelIndex: currentLevelIndex + 1,
        };
      }
      return { ...state, isGameComplete: true };
    }

    case SHOW_MENU:
      return { ...state, currentScreen: SCREEN_MENU };

    case ADD_SCORE_TO_LEADERBOARD: {
      const { leaderboard } = state;
      const { score } = action;
      leaderboard.push(score);
      return { ...state };
    }

    case SHOW_LEADERBOARD:
      return { ...state, currentScreen: SCREEN_LEADERBOARD };

    case RESTART_LEVEL: {
      const { currentLevelIndex, levels } = state;
      return { ...state, currentLevel: levels[currentLevelIndex] };
    }

    case START_GAME: {
      return {
        ...state,
        ...createGame(),
        currentScreen: SCREEN_GAME,
      };
    }

    default:
      return state;
  }
}
