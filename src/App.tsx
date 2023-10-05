import { useState } from "react";
import TabContent from "./components/TabContent";

// https://liftitapp.netlify.app/ for reference

function App() {
  const [activeTab, setActiveTab] = useState("Push");

  function getButtonClass(tab: string): string {
    return `btn btn-ghost normal-case text-xl ${
      activeTab === tab ? "active" : ""
    }`;
  }

  return (
    <>
      <h1 className="m-8 text-center text-3xl font-bold">RepYOUtation</h1>
      <div className="navbar flex justify-between bg-neutral text-neutral-content space-x-4">
        <button
          className={`flex-grow ${getButtonClass("Push")}`}
          onClick={() => setActiveTab("Push")}
        >
          Push
        </button>
        <button
          className={`flex-grow ${getButtonClass("Pull")}`}
          onClick={() => setActiveTab("Pull")}
        >
          Pull
        </button>
        <button
          className={`flex-grow ${getButtonClass("Legs")}`}
          onClick={() => setActiveTab("Legs")}
        >
          Legs
        </button>
        <button
          className={`flex-grow ${getButtonClass("Abs")}`}
          onClick={() => setActiveTab("Abs")}
        >
          Abs
        </button>
        <button
          className={`flex-grow ${getButtonClass("Cardio")}`}
          onClick={() => setActiveTab("Cardio")}
        >
          Cardio
        </button>
      </div>
      <TabContent activeTab={activeTab} />
    </>
  );
}

export default App;
