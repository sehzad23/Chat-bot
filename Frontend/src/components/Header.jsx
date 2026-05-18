const Header = ({ isConnected }) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 sticky top-0 bg-[#0b1220] z-10">
      <div>
        <h1 className="text-lg font-semibold">AI Chat</h1>
        <p className="text-sm text-gray-400">
          Chat with your AI assistant
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span
          className={`w-2 h-2 ${
            isConnected ? "bg-green-500" : "bg-red-500"
          } rounded-full`}
        ></span>

        <p className="text-gray-400">
          {isConnected ? "Connected" : "Disconnected"}
        </p>
      </div>
    </div>
  );
};

export default Header;