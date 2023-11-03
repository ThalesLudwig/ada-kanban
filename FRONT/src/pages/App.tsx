import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiMoon, FiSun, FiFolderPlus } from "react-icons/fi";
import { Oval } from "react-loader-spinner";
import { useTheme } from "styled-components";
import { toast } from "react-toastify";

import Card from "../components/Card/Card";
import { AppDispatch, RootState } from "../config/store";
import { switchTheme } from "../config/themeSlice";
import useCards from "../hooks/useCards";
import CardForm from "../components/CardForm/CardForm";
import Column from "../components/Column/Column";
import {
  Button,
  ButtonRow,
  Columns,
  Container,
  Row,
  Subtitle,
  Title,
} from "./App.styled";

function App() {
  const { isDarkMode } = useSelector((store: RootState) => store.theme);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const { cards, error, isLoading, removeCard, updateCard, addCard } =
    useCards();

  const changeTheme = () => {
    dispatch(switchTheme());
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <Container>
      <Row>
        <Title>Task Board</Title>
        <ButtonRow>
          {isLoading && (
            <Oval
              color={theme.primary}
              secondaryColor={theme.primaryContainer}
              height={30}
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          )}
          <Button onClick={() => setShowForm(true)}>
            <FiFolderPlus />
            Add Task
          </Button>
          <Button onClick={changeTheme}>
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </Button>
        </ButtonRow>
      </Row>
      <Columns>
        <Column name="ToDo" onDrag={updateCard}>
          <Subtitle>To Do</Subtitle>
          {showForm && (
            <CardForm onAdd={addCard} onCancel={() => setShowForm(false)} />
          )}
          {cards
            .filter((card) => card.lista === "ToDo")
            .map((card) => (
              <Card
                onUpdate={(updatedCard) => updateCard(updatedCard)}
                onRemove={() => removeCard(card.id)}
                key={card.id}
                {...card}
              />
            ))}
        </Column>
        <Column name="Doing" onDrag={updateCard}>
          <Subtitle>Doing</Subtitle>
          {cards
            .filter((card) => card.lista === "Doing")
            .map((card) => (
              <Card
                onUpdate={(updatedCard) => updateCard(updatedCard)}
                onRemove={() => removeCard(card.id)}
                key={card.id}
                {...card}
              />
            ))}
        </Column>
        <Column name="Done" onDrag={updateCard}>
          <Subtitle>Done</Subtitle>
          {cards
            .filter((card) => card.lista === "Done")
            .map((card) => (
              <Card
                onUpdate={(updatedCard) => updateCard(updatedCard)}
                onRemove={() => removeCard(card.id)}
                key={card.id}
                {...card}
              />
            ))}
        </Column>
      </Columns>
    </Container>
  );
}

export default App;
