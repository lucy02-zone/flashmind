import api from "./api";

export const getPlans =
  async () => {

    const response =
      await api.get(
        "/revision-plans"
      );

    return response.data;
  };