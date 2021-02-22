import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';
import { formatTime } from '../js/time';
import { stripes } from '../styles/mixins';

export const LeaderboardContainer = styled.div`
  font-size: 24px;

  span {
    background: white;
    padding: 5px 20px;
    display: block;
    color: gray;
    font-size: 15px;
    text-transform: uppercase;
  }

  ol {
    counter-reset: counter;
    list-style: none;
  }

  li {
    counter-increment: counter;
    margin: 0 0 10px;
    background: white;
    padding: 5px 20px 5px 50px;
    text-align: center;
    position: relative;

    &::before {
      content: counter(counter);
      color: #ffd903;
      background: black;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      line-height: 48px;
      padding: 0 15px;
    }

    &:last-child {
      margin: 0;
    }
  }
`;

const LeaderBoardContainerInner = styled.div`
  ${stripes};
  max-width: 400px;
  padding: 50px;
  margin: 40px 0;
`;

export default function LeaderBoard({ showMenu, leaderboard }) {
  return (
    <LeaderboardContainer>
      🏆 LEADERBOARD 🏆
      <LeaderBoardContainerInner>
        {leaderboard.length > 0 ? (
          <ol>
            {leaderboard
              .sort((a, b) => a - b)
              .map((score, index) => (
                <li key={`score_${index}`}>{formatTime(score)}</li>
              ))}
          </ol>
        ) : (
          <span>No scores</span>
        )}
      </LeaderBoardContainerInner>
      <Button onClick={showMenu}>Menu</Button>
    </LeaderboardContainer>
  );
}
