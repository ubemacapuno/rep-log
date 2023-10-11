import { useState } from "react";
import TabContent from "./components/TabContent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// https://liftitapp.netlify.app/ for inspo
function App() {
  const [activeTab, setActiveTab] = useState("Push");

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="m-8 text-center text-5xl font-bold text-primary">
        <span className="material-symbols-outlined text-4xl text-accent">
          exercise
        </span>
        RepLog
      </h1>
      {/* setActiveTab function fires when user clicks on a Navbar tab */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow">
        {/* setActiveTab fires on addExercise() and editExercise() */}
        <TabContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
