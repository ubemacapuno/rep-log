import { useState } from "react";
import TabContent from "./components/TabContent";

function App() {
  const [activeTab, setActiveTab] = useState("Push");

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("Push")}>Push</button>
        <button onClick={() => setActiveTab("Pull")}>Pull</button>
        <button onClick={() => setActiveTab("Legs")}>Legs</button>
        <button onClick={() => setActiveTab("Abs")}>Abs</button>
        <button onClick={() => setActiveTab("Cardio")}>Cardio</button>
      </div>
      <TabContent activeTab={activeTab} />
    </div>
  );
}

export default App;
