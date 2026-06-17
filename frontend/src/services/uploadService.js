import api from "./api";

export const uploadFile =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        "/uploads",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export const getUserFiles =
  async () => {

    const response =
      await api.get(
        "/uploads"
      );

    return response.data;
  };