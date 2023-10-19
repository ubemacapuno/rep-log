import { useRef } from "react";

function LocalStorageManager({ onDataChanged }: { onDataChanged: () => void }) {
  const handleExport = () => {
    const exercisesData = localStorage.getItem("exercises");
    if (exercisesData) {
      const dataStr =
        "data:text/json;charset=utf-8," + encodeURIComponent(exercisesData);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "exercises_backup.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else {
      alert("No data was found to export! Add some exercises first.");
    }
  };

  const handleClear = () => {
    const confirmation = window.confirm(
      "Are you sure you want to reset ALL exercise data? This cannot be undone."
    );
    if (confirmation) {
      localStorage.clear();
      onDataChanged();
      alert("Local storage cleared!");
    }
  };

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target!.result as string);
        if (data && typeof data === "object" && !Array.isArray(data)) {
          for (let key in data) {
            localStorage.setItem(key, data[key]);
          }
        } else if (Array.isArray(data)) {
          localStorage.setItem("exercises", JSON.stringify(data));
        }
        alert("Data loaded into local storage successfully!");

        // Invoke onDataChanged here after successfully updating local storage
        console.log("Success - running onDataChanged . . .");
        onDataChanged();
      } catch (error) {
        alert("Failed to load data. Please ensure it's a valid JSON.");
      }
    };
    reader.readAsText(file);
  };

  const fileInputRef = useRef<HTMLInputElement>(null); // (1) useRef to reference the file input

  const triggerFileInput = () => {
    const confirmation = window.confirm(
      "Imported data will overwrite all existing data. Do you wish to proceed? This cannot be undone."
    );
    if (confirmation) {
      // The actual file input is hidden. This function fires onClick
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      <h3 className=" text-3xl font-bold text-primary">
        <span className="material-symbols-outlined text-2xl text-accent">
          exercise
        </span>
        RepLog
      </h3>

      <a
        rel="noreferrer noopener"
        className="text-xs no-underline link link-accent"
        href="https://liftitapp.netlify.app/"
        target="_blank"
        aria-label="GitHub Repository"
      >
        Inspired by LIFT.IT
      </a>
      <span className="">
        Created by{" "}
        <a
          rel="noreferrer noopener"
          className=" no-underline link link-secondary"
          href="https://coreydamocles.netlify.app/"
          target="_blank"
        >
          Corey Damocles{" "}
        </a>
        <span className="text-primary">© {new Date().getFullYear()}</span>
      </span>
      <input
        ref={fileInputRef} // Connect the input to the useRef
        type="file"
        onChange={handleLoad}
        style={{ display: "none" }} // This is hidden, but triggerFileInput() will run onClick
      />

      <button onClick={handleClear} className="btn btn-error">
        Reset All Data
      </button>
      <div className="flex justify-between">
        <button onClick={triggerFileInput} className="btn btn-success">
          Import Data
        </button>

        <button onClick={handleExport} className="btn btn-primary">
          Export Data
        </button>
      </div>
    </div>
  );
}

export default LocalStorageManager;
