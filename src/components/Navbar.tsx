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
    <div className="navbar flex justify-between border-b-8 p-0 border-neutral	text-neutral-content space-x-4">
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          className={`text-lg flex-grow ${getButtonClass(category.name)} w-10`}
          onClick={() => setActiveTab(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
