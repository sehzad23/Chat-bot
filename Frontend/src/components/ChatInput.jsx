import { useState } from "react";

const ChatInput = ({ sendMessage }) => {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    sendMessage(inputText);
    setInputText("");
  };

  return (
    <div className="mb-4 sticky bottom-0">
      <div className="flex items-center bg-[#111827] rounded-xl px-4 py-2 mx-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent outline-none text-sm"
        />

        <button
          onClick={handleSend}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full ml-2"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatInput;