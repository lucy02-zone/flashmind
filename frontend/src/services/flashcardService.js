import api from "./api";

export const getFlashcards =
  async () => {

    const response =
      await api.get(
        "/flashcards"
      );

    return response.data;
  };