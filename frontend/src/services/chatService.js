import api from "./api";

export const sendMessage = async (fileId, message) => {
  const response = await api.post("/chat", {
    fileId,
    question: message
  });
  return response.data;
};

export const getChatHistory = async () => {
  const response = await api.get("/chat");
  return response.data;
};
