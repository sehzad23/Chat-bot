export const saveChat = (messages) => {
  localStorage.setItem("chat", JSON.stringify(messages));
};

export const loadChat = () => {
  return JSON.parse(localStorage.getItem("chat")) || [];
};