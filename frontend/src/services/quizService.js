import api from "./api";

export const getQuizzes =
  async () => {

    const response =
      await api.get(
        "/quizzes"
      );

    return response.data;
  };