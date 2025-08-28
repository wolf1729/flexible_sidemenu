const SidebarItem = ({ icon, text, active, selectFunction }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectFunction();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={selectFunction}
      onKeyDown={handleKeyDown}
      className={`flex items-center gap-3 p-2 rounded-md text-sm cursor-pointer mb-1 text-gray-700 transition-colors duration-200 hover:bg-gray-100 ${
        active ? "bg-indigo-50 text-blue-600" : ""
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default SidebarItem;