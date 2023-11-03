import { useMemo, useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useTheme } from "styled-components";

import {
  ButtonRow,
  Container,
  Pressable,
  Divider,
  Input,
  TextArea,
  Title,
} from "../Card/Card.styled";

type CardFormProps = {
  onAdd: (title: string, content: string) => void;
  onCancel: () => void;
};

function CardForm({ onAdd, onCancel }: CardFormProps) {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const disabled = useMemo(() => {
    return !title || !content;
  }, [title, content]);

  const handleAdd = () => {
    if (disabled) return;
    onAdd(title, content);
    setContent("");
    setTitle("");
  };

  return (
    <Container $disableDrag>
      <Title>New Card</Title>
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextArea placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content} />
      <Divider />
      <ButtonRow>
        <Pressable onClick={handleAdd}>
          <FiCheckCircle aria-label="submit" color={disabled ? theme.surfaceDisabled : theme.onBackground} />
        </Pressable>
        <Pressable onClick={onCancel}>
          <FiXCircle aria-label="cancel" color={theme.onBackground} />
        </Pressable>
      </ButtonRow>
    </Container>
  );
}

export default CardForm;
