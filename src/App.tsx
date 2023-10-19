import { useState } from "react";
import TabContent from "./components/TabContent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { v4 as uuidv4 } from "uuid";
import { ToastArgs } from "./types/ExerciseTypes";
import Modal from "./components/Modal";
import LocalStorageManager from "./components/LocalStorageManager";

// https://liftitapp.netlify.app/ for inspo
function App() {
  const [activeTab, setActiveTab] = useState("Push");
  // Each toast will have a unique id (for key mapping), a message, and a type
  const [toasts, setToasts] = useState<
    {
      id: string;
      message: string;
      type: "info" | "success" | "warning" | "error";
    }[]
  >([]);

  const [showLocalStorageModal, setShowLocalStorageModal] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);

  const addToast = ({ message, type }: ToastArgs) => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Remove the toast after 3.5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 2500);
    console.log(toasts);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <h1
          className="m-8 text-center text-5xl font-bold text-primary cursor-pointer"
          onClick={() => setShowLocalStorageModal(true)}
        >
          {" "}
          <span className="material-symbols-outlined text-4xl text-accent">
            exercise
          </span>
          RepLog
        </h1>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-grow">
          {/* setActiveTab fires on addExercise() and editExercise() */}
          <TabContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            addToast={addToast}
            dataChanged={dataChanged}
          />
        </div>
        <Footer />
      </div>
      <div className="fixed bottom-4 right-4 flex flex-col-reverse space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>

      {/* Modal for localStorage options */}
      {showLocalStorageModal && (
        <Modal onClose={() => setShowLocalStorageModal(false)}>
          <LocalStorageManager
            onDataChanged={() => setDataChanged((prev) => !prev)}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
