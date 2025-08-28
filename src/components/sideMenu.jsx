import { useEffect } from "react";

import SidebarItem from "./sidebarItems";

/**
 * SideMenu component
 */
const SideMenu = ({
  isOpen,
  setIsOpen,
  activeId,
  onSelect,
  sections,
  user,
  logo,
  closeIcon,
  breakpoint = 768,
  width = "15rem",
}) => {
  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < breakpoint;
    document.body.style.overflow = isMobile && isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, breakpoint]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          role="button"
          tabIndex={0}
          aria-label="Close sidebar overlay"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsOpen(false);
          }}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 shadow-md flex flex-col justify-between p-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">{logo}</div>
          <button onClick={() => setIsOpen(false)} aria-label="Close Sidebar">
            {closeIcon}
          </button>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto">
          {sections.map((section, i) => (
            <div key={i} className="mb-6">
              {section.title && (
                <p className="text-[10px] text-gray-400 uppercase mb-2">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  text={item.text}
                  active={activeId === item.id}
                  selectFunction={() => {
                    onSelect(item.id);
                    if (
                      typeof window !== "undefined" &&
                      window.innerWidth < breakpoint
                    ) {
                      setIsOpen(false);
                    }
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* User Info */}
        {user?.email && (
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-200">
            <div className="flex items-center gap-2">
              {user.avatar}
              <p className="text-sm text-gray-700 max-w-[130px] truncate">
                {user.username}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideMenu;
