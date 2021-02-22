import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  font-size: 15px;
  padding: 8px 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  background: white;
  font-family: inherit;
  border: none;
  box-shadow: 5px 5px black;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background: #d9d9d9;
  }
`;
