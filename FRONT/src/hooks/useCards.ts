import { useState, useEffect } from "react";

import { Card } from "../types/Card";
import useAuth from "./useAuth";

const URL = "http://localhost:5000/cards";

const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token, isLoading: isTokenLoading, error: tokenError } = useAuth();

  const removeCard = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = await response.json();
      setCards(data);
      setError("");
    } catch (error) {
      setError((error as { message: string }).message);
    }
    setIsLoading(false);
  };

  const updateCard = async (card: Card) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL}/${card.id}`, {
        method: "PUT",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(card),
      });
      const { data } = await response.json();
      const index = cards.findIndex((c) => c.id === card.id);
      const newCards = [...cards];
      newCards[index] = data;
      setCards(newCards);
      setError("");
    } catch (error) {
      setError((error as { message: string }).message);
    }
    setIsLoading(false);
  };

  const addCard = async (title: string, content: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify({ titulo: title, conteudo: content, lista: "ToDo"}),
      });
      const { data } = await response.json();
      setCards([data, ...cards]);
      setError("");
    } catch (error) {
      setError((error as { message: string }).message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { data } = await response.json();
        setCards(data);
        setError("");
      } catch (error) {
        setError((error as { message: string }).message);
      }
      setIsLoading(false);
    };

    fetchCards();
  }, [token]);

  return {
    cards,
    isLoading: isLoading || isTokenLoading,
    error: error || tokenError,
    removeCard,
    updateCard,
    addCard,
  };
};

export default useCards;
