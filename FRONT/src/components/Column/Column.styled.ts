import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  gap: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primaryContainer};
  min-width: 300px;
`;
