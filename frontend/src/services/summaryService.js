import api from "./api";

export const getSummaries =
  async () => {

    const response =
      await api.get(
        "/summaries"
      );

    return response.data;
  };