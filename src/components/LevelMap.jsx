import React from 'react';
import styled from 'styled-components';
import { TYPE_BOX, TYPE_PLACEHOLDER, TYPE_WALL } from '../constants/fields';
import { findFieldsByType } from '../js/game';
import { stripes } from '../styles/mixins';

const FIELD_SIZE = 50;

export const LevelMapContainer = styled.div`
  height: ${({ height }) => (height + 1) * FIELD_SIZE}px;
  position: relative;
`;

export const LevelMapField = styled.div`
  height: ${FIELD_SIZE}px;
  width: ${FIELD_SIZE}px;
  background: white;
  text-align: center;
  position: absolute;
  ${({ x }) => `left: ${x * FIELD_SIZE}px`};
  ${({ y }) => `top: ${y * FIELD_SIZE}px`};
  ${({ type }) => type === TYPE_PLACEHOLDER && `background: transparent;`}
  ${({ type }) => type === TYPE_WALL && stripes}
`;

export const LevelMapFieldTarget = styled(LevelMapField)`
  &::after {
    content: '×';
    color: #ffd903;
    font-size: 40px;
    line-height: ${FIELD_SIZE}px;
  }
`;

export const LevelMapFieldBox = styled(LevelMapField)`
  background: ${({ complete }) => (complete ? '#2e8350' : '#ffd903')};
  box-shadow: inset 0 0 0 10px #5b5d59;
  border: 2px aliceblue solid;
`;

export const Player = styled(LevelMapField)`
  pointer-events: none;
  text-align: center;
  padding-top: 2px;

  &::after {
    line-height: ${FIELD_SIZE}px;
    content: '😂';
    font-size: 36px;
  }
`;

const renderField = Component => props => <Component key={props.id} {...props} />;

export default function LevelMap({ level }) {
  const { map, playerPos, targets } = level;
  const boxes = findFieldsByType(TYPE_BOX, map);

  return (
    <LevelMapContainer
      height={Math.max.apply(
        Math,
        map.map(f => f.y),
      )}
    >
      {map.map(renderField(LevelMapField))}
      {targets.map(renderField(LevelMapFieldTarget))}
      {boxes.map(renderField(LevelMapFieldBox))}
      <Player {...playerPos} />
    </LevelMapContainer>
  );
}
