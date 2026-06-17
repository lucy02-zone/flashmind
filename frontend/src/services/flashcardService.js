import api from "./api";

export const getFlashcards =
  async (fileId) => {
    const response =
      await api.get(
        "/flashcards",
        {
          params: { fileId }
        }
      );

    return response.data;
  };