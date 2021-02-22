import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LevelMap from './LevelMap';
import Navigation from './Navigation';
import { Button } from './Button';
import { LevelMaps } from '../constants/levelmaps';
import { formatTime } from '../js/time';

const LevelTimer = styled.span`
  font-size: 15px;
  display: inline-block;
  padding: 5px 18px;
  background: white;
`;

const LevelMessage = styled.span`
  font-size: 15px;
  padding: 5px 18px;
  background: black;
  color: white;
`;

const LevelIndex = styled.div`
  font-size: 12px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const LevelStatus = styled.div`
  margin-bottom: 50px;
  height: 20px;
`;

export default function Level({
  level,
  isGameComplete,
  movePlayer,
  restartMap,
  loadNextLevel,
  showMenu,
  showLeaderBoard,
  addScoreToLeaderboard,
}) {
  const { isLevelComplete, index } = level;
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);

  const handleKeyDown = ({ code }) => {
    switch (code) {
      case 'ArrowDown':
        movePlayer({ dx: 0, dy: 1 });
        break;
      case 'ArrowRight':
        movePlayer({ dx: 1, dy: 0 });
        break;
      case 'ArrowLeft':
        movePlayer({ dx: -1, dy: 0 });
        break;
      case 'ArrowUp':
        movePlayer({ dx: 0, dy: -1 });
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    countRef.current = setInterval(() => setTimer(timer => timer + 1), 1000);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(countRef.current);
    };
  }, []);

  useEffect(() => {
    if (isLevelComplete) {
      const timeout = setTimeout(() => loadNextLevel(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isLevelComplete]);

  useEffect(() => {
    if (isGameComplete) {
      clearInterval(countRef.current);
      addScoreToLeaderboard(timer);
    }
  }, [isGameComplete]);

  const messageGameComplete = <LevelMessage>{'Game complete!'}</LevelMessage>;
  const messageLevelComplete = <LevelMessage>{'Level complete!'}</LevelMessage>;

  return (
    <>
      <LevelIndex>
        <span>{`Level ${index + 1} of ${LevelMaps.length}`}</span>
        <Navigation />
      </LevelIndex>

      <LevelMap level={level} />

      <LevelStatus>
        <LevelTimer>{formatTime(timer)}</LevelTimer>
        {isGameComplete && messageGameComplete}
        {isLevelComplete && !isGameComplete && messageLevelComplete}
      </LevelStatus>

      <Button onClick={showMenu}>Menu</Button>

      {isGameComplete && <Button onClick={showLeaderBoard}>Leaderboard</Button>}
      {!isGameComplete && <Button onClick={restartMap}>Restart level</Button>}
    </>
  );
}
