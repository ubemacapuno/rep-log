import { useState } from "react";
import TabContent from "./components/TabContent";
import Navbar from "./components/Navbar";

// https://liftitapp.netlify.app/ for reference

function App() {
  const [activeTab, setActiveTab] = useState("Push");

  return (
    <>
      <h1 className="m-8 text-center text-3xl font-bold">RepLog</h1>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} />
    </>
  );
}

export default App;
