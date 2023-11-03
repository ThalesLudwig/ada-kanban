import { useDrop } from "react-dnd";

import { Container } from "./Column.styled";
import { Card } from "../../types/Card";
import { Column as ColumnType } from "../../types/Column";

type ColumnProps = {
  children: React.ReactNode;
  name: ColumnType;
  onDrag: (card: Card) => void;
};

function Column({ children, name, onDrag }: ColumnProps) {
  const handleMove = (card: Card) => {
    if (card.lista === name) return;
    onDrag({ ...card, lista: name });
  };

  const [, dropRef] = useDrop({
    accept: "task",
    drop: (item: Card) => handleMove(item),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return <Container ref={dropRef}>{children}</Container>;
}

export default Column;
