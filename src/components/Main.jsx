import React from 'react';
import styled from 'styled-components';
import { SCREEN_GAME, SCREEN_LEADERBOARD, SCREEN_MENU } from '../constants/screens';

import Menu from './Menu';
import LeaderBoard from './LeaderBoard';
import Level from './Level';

export const MainContainer = styled.div`
  padding: 50px;
`;

export default function Main({
  isGameComplete,
  currentScreen,
  currentLevel,
  levelsCount,
  leaderboard,
  actions,
}) {
  const {
    showMenu,
    showLeaderBoard,
    startNewGame,
    movePlayer,
    restartMap,
    loadNextLevel,
    addScoreToLeaderboard,
  } = actions;

  return (
    <MainContainer>
      {currentScreen === SCREEN_GAME && (
        <Level
          addScoreToLeaderboard={addScoreToLeaderboard}
          levelsCount={levelsCount}
          loadNextLevel={loadNextLevel}
          level={currentLevel}
          movePlayer={movePlayer}
          restartMap={restartMap}
          isGameComplete={isGameComplete}
          showLeaderBoard={showLeaderBoard}
          showMenu={showMenu}
        />
      )}
      {currentScreen === SCREEN_MENU && (
        <Menu
          loadNextLevel={loadNextLevel}
          showLeaderBoard={showLeaderBoard}
          startNewGame={startNewGame}
        />
      )}
      {currentScreen === SCREEN_LEADERBOARD && (
        <LeaderBoard showMenu={showMenu} leaderboard={leaderboard} />
      )}
    </MainContainer>
  );
}
