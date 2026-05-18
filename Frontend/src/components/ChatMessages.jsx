const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-full mt-5 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            💬
          </div>

          <h2 className="text-xl font-semibold">
            Start a conversation
          </h2>

          <p className="text-gray-400 mt-2">
            Ask me anything and I’ll help you out!
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;