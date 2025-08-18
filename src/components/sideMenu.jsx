"use client";
import { useEffect } from "react";
import "./style.css";

/**
 * Represents a single sidebar item.
 * @typedef {Object} SidebarItemType
 * @property {string|number} id - Unique identifier for the item.
 * @property {React.ReactNode} [icon] - Optional icon displayed before the text.
 * @property {string} text - The visible label for the item.
 */

/**
 * Represents a logical section inside the sidebar.
 * @typedef {Object} SidebarSection
 * @property {string} [title] - Optional section heading displayed above the items.
 * @property {SidebarItemType[]} items - List of sidebar items contained in this section.
 */

/**
 * User information displayed at the bottom of the sidebar.
 * @typedef {Object} UserInfo
 * @property {string} [username] - Display name of the user.
 * @property {string} [email] - User’s email address (used as condition to show user block).
 * @property {React.ReactNode} [avatar] - Optional avatar element (e.g., image or icon).
 */

/**
 * Props for the {@link SideMenu} component.
 * @typedef {Object} SidebarProps
 * @property {boolean} isOpen - Whether the sidebar is currently open.
 * @property {(open: boolean) => void} setIsOpen - Callback to update the open/closed state.
 * @property {string|number} activeId - The `id` of the currently active item.
 * @property {(id: string|number) => void} onSelect - Callback triggered when a sidebar item is selected.
 * @property {SidebarSection[]} sections - Array of sidebar sections to render.
 * @property {UserInfo} [user] - Optional user information displayed at the bottom of the sidebar.
 * @property {React.ReactNode} [logo] - Optional logo element displayed in the header.
 * @property {React.ReactNode} [closeIcon] - Optional icon/button for closing the sidebar.
 * @property {number} [breakpoint=768] - Screen width (in px) below which the sidebar behaves as mobile (default: `768`).
 * @property {string} [width="15rem"] - Width of the sidebar when open (default: `15rem`).
 */

/**
 * Responsive Sidebar component with support for sections, items, user info, and accessibility.
 * - On mobile screens (`window.innerWidth < breakpoint`), the body scroll is disabled when open.
 * - Sections can contain items with icons and labels.
 * - Displays optional user info block at the bottom.
 *
 * @function
 * @param {SidebarProps} props - The props for the component.
 * @returns {JSX.Element} The rendered sidebar.
 *
 * @example
 * <SideMenu
 *   isOpen={isOpen}
 *   setIsOpen={setIsOpen}
 *   activeId={activeId}
 *   onSelect={(id) => console.log("Selected:", id)}
 *   sections={[
 *     { title: "Main", items: [{ id: 1, text: "Dashboard" }, { id: 2, text: "Settings" }] }
 *   ]}
 *   user={{ username: "John Doe", email: "john@example.com" }}
 *   logo={<img src="/logo.png" alt="App Logo" />}
 *   closeIcon={<span>×</span>}
 * />
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
          className="sidebar-overlay md:hidden"
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
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        style={{ width }}
      >
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">{logo}</div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Sidebar"
          >
            {closeIcon}
          </button>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto">
          {sections.map((section, i) => (
            <div key={i} className="sidebar-section">
              {section.title && (
                <p className="sidebar-section-title">{section.title}</p>
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
          <div className="sidebar-user">
            <div className="sidebar-user-info">
              {user.avatar}
              <p className="sidebar-user-name">{user.username}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

/**
 * SidebarItem component used within {@link SideMenu}.
 * Represents a clickable and keyboard-accessible sidebar item.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} [props.icon] - Optional icon to render before the text.
 * @param {string} props.text - Text label of the item.
 * @param {boolean} [props.active] - Whether the item is currently active.
 * @param {() => void} props.selectFunction - Callback when the item is selected.
 * @returns {JSX.Element} The rendered sidebar item.
 */
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
      className={`sidebar-item ${active ? "active" : ""}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default SideMenu;
