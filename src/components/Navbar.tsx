import React from "react";
import { CATEGORIES } from "../constants/constants";

interface NavbarProps {
  activeTab: string; // prop for current activeTab value (for useState)
  setActiveTab: (tab: string) => void; // function prop for updating activeTab (for useState)
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  // Set active class for the selected tab
  function getButtonClass(tab: string): string {
    return `btn btn-ghost normal-case text-xl ${
      activeTab === tab ? "active" : ""
    }`;
  }

  return (
    <div className="navbar flex justify-between bg-neutral text-neutral-content space-x-4">
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          className={`flex-grow ${getButtonClass(category.name)}`}
          onClick={() => setActiveTab(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
