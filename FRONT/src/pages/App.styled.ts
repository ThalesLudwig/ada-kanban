import styled from "styled-components";

import { typography } from "../constants/typography";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  overflow-x: auto;
`;

export const Title = styled.h1`
  font-size: ${typography.title}px;
  color: ${({ theme }) => theme.onBackground};
  font-weight: bold;
  margin: 0;
`;

export const Subtitle = styled.span`
  font-size: ${typography.body1}px;
  color: ${({ theme }) => theme.onPrimaryContainer};
  font-weight: bold;
`;

export const Button = styled.button`
  font-size: ${typography.button}px;
  cursor: pointer;
  padding: 15px;
  border-radius: 10px;
  border-style: none;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  &:hover {
    transform: translateY(-3px);
  }
`;
