import React from 'react';
import styled from 'styled-components';
import { stripes } from '../styles/mixins';
import { Button } from './Button';

export const MenuContainer = styled.div`
  ${stripes};
  padding: 50px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export default function Menu({ showLeaderBoard, startNewGame }) {
  return (
    <MenuContainer>
      <Button onClick={startNewGame}>New game</Button>
      <br />
      <Button onClick={showLeaderBoard}>Leaderboard</Button>
    </MenuContainer>
  );
}
