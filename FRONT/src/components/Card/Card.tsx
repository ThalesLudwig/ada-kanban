import { useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { useDrag } from "react-dnd";
import remarkGfm from "remark-gfm";
import {
  FiTrash,
  FiEdit,
  FiXCircle,
  FiCheckCircle,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { Card as CardType } from "../../types/Card";
import { Column } from "../../types/Column";
import {
  ButtonRow,
  Container,
  Pressable,
  Divider,
  Title,
  Alert,
  AlertButton,
  Input,
  TextArea,
  Header,
  Content,
  Avatar,
  MarkdownText,
} from "./Card.styled";

type CardProps = {
  onRemove: () => void;
  onUpdate: (card: CardType) => void;
} & CardType;

function Card({ id, lista, conteudo, titulo, onRemove, onUpdate }: CardProps) {
  const theme = useTheme();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(titulo);
  const [content, setContent] = useState(conteudo);

  const [, dragRef] = useDrag({
    type: "task",
    item: { id, lista, conteudo, titulo },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const disabled = useMemo(() => {
    return !title || !content;
  }, [title, content]);

  const handleUpdate = () => {
    if (disabled) return;
    onUpdate({ id, lista, conteudo: content, titulo: title });
    setIsEditMode(false);
  };

  const handleEditCancel = () => {
    setIsEditMode(false);
    setTitle(titulo);
    setContent(conteudo);
  };

  const handleMove = (direction: "left" | "right") => {
    if (direction === "left" && lista === "ToDo") return;
    if (direction === "right" && lista === "Done") return;
    let moveTo: Column;
    switch (lista) {
      case "ToDo":
        moveTo = "Doing";
        break;
      case "Doing":
        if (direction === "left") moveTo = "ToDo";
        else moveTo = "Done";
        break;
      case "Done":
        moveTo = "Doing";
        break;
      default:
        moveTo = lista;
        break;
    }

    onUpdate({ id, lista: moveTo, conteudo, titulo });
  };

  return (
    <Container ref={dragRef}>
      <Header>
        {!isEditMode && (
          <Avatar>
            <FiUser color={theme.onPrimary} />
          </Avatar>
        )}
        <Content>
          <Title>{titulo}</Title>
          {isEditMode && (
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          )}
          {!isEditMode && (
            <MarkdownText remarkPlugins={[remarkGfm]}>{conteudo}</MarkdownText>
          )}
          {isEditMode && (
            <TextArea
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          )}
        </Content>
      </Header>
      <Divider />
      <ButtonRow>
        {!isEditMode && (
          <>
            <Pressable onClick={() => handleMove("left")}>
              <FiChevronLeft aria-label="left" color={lista !== "ToDo" ? theme.onBackground : theme.surfaceDisabled} />
            </Pressable>
            <Pressable onClick={() => handleMove("right")}>
              <FiChevronRight aria-label="right" color={lista !== "Done" ? theme.onBackground : theme.surfaceDisabled} />
            </Pressable>
            <Pressable onClick={() => setIsEditMode(true)}>
              <FiEdit aria-label="edit" color={theme.onBackground} />
            </Pressable>
          </>
        )}
        {isEditMode && (
          <>
            <Pressable onClick={handleUpdate}>
              <FiCheckCircle
                aria-label="update"
                color={disabled ? theme.surfaceDisabled : theme.onBackground}
              />
            </Pressable>
            <Pressable onClick={handleEditCancel}>
              <FiXCircle aria-label="cancel-edit" color={theme.onBackground} />
            </Pressable>
          </>
        )}
        <Pressable onClick={() => setIsAlertVisible(true)}>
          <FiTrash aria-label="show-alert" color={theme.onBackground} />
        </Pressable>
      </ButtonRow>
      {isAlertVisible && (
        <Alert>
          Are you sure?
          <ButtonRow>
            <AlertButton aria-label="remove" onClick={onRemove}>Yes</AlertButton>
            <AlertButton aria-label="cancel-delete" onClick={() => setIsAlertVisible(false)}>
              No
            </AlertButton>
          </ButtonRow>
        </Alert>
      )}
    </Container>
  );
}

export default Card;
