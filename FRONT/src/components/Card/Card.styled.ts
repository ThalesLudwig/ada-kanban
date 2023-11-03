import styled from "styled-components";
import Markdown from 'react-markdown'

import { typography } from "../../constants/typography";

export const Container = styled.section<{ $disableDrag?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.elevation.level1};
  border-radius: 10px;
  padding: 20px;
  gap: 10px;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  cursor: ${({ $disableDrag }) => ($disableDrag ? "default" : "grab")};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

export const Avatar = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  margin-top: 5px;
`;

export const Title = styled.h1`
  font-size: ${typography.body1}px;
  color: ${({ theme }) => theme.onBackground};
  font-weight: bold;
  margin: 0;
`;

export const MarkdownText = styled(Markdown)`
  font-size: ${typography.body1}px;
  color: ${({ theme }) => theme.onBackground};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.surface};
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
`;

export const Pressable = styled.button`
  cursor: pointer;
  border: none;
  background: ${({ theme }) => theme.elevation.level1};
  font-size: 16px;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
`;

export const Alert = styled.div`
  flex: 1;
  padding: 10px;
  background: ${({ theme }) => theme.errorContainer};
  color: ${({ theme }) => theme.onErrorContainer};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5px;
`;

export const AlertButton = styled.button`
  cursor: pointer;
  border: none;
  background: ${({ theme }) => theme.errorContainer};
  color: ${({ theme }) => theme.onErrorContainer};
  font-weight: bold;
  font-size: 16px;
`;

export const Input = styled.input`
  background: ${({ theme }) => theme.elevation.level1};
  color: ${({ theme }) => theme.onBackground};
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.outline};
  outline-color: ${({ theme }) => theme.primary};
  font-family: inherit;
  font-size: inherit;
`;

export const TextArea = styled.textarea`
  background: ${({ theme }) => theme.elevation.level1};
  color: ${({ theme }) => theme.onBackground};
  font-size: ${typography.body1};
  padding: 10px;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.outline};
  outline-color: ${({ theme }) => theme.primary};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
`;
