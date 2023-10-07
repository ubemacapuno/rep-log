import React from "react";

interface NavbarProps {
  activeTab: string; // prop for current activeTab value (for useState)
  setActiveTab: (tab: string) => void; // function prop for updating activeTab (for useState)
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["Push", "Pull", "Legs", "Abs", "Cardio"];

  // Set active class for the selected tab
  function getButtonClass(tab: string): string {
    return `btn btn-ghost normal-case text-xl ${
      activeTab === tab ? "active" : ""
    }`;
  }

  return (
    <div className="navbar flex justify-between bg-neutral text-neutral-content space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`flex-grow ${getButtonClass(tab)}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
